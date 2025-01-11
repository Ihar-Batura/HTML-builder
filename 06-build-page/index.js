const fs = require('fs'); // Читать файлы / Создать файлы / Обновить файлы / Удалить файлы / Переименовать файлы
const path = require('path'); // предоставляет набор функций для работы с путями в файловой системе

const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToFileTemplate = path.join(__dirname, 'template.html');
const pathToNewFileHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathToFolderComponents = path.join(__dirname, 'components');
const pathToNewStyle = path.join(__dirname, 'project-dist', 'style.css');

async function buildPage() {
  createFolderDist();
  createFileStyle();
  createFolderAssets();
  createFileHtml();
}

buildPage();

function createFolderDist() {
  fs.mkdir(pathToProjectDist, { recursive: true }, function (error) {
    if (error) {
      throw error;
    }
  });
}

function createFileStyle() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
    '',
    function (error) {
      if (error) {
        throw error;
      }
    },
  );

  copyStyles();
}

function copyStyles() {
  fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    function (error, files) {
      if (error) {
        return error;
      }
      files.forEach((file) => {
        if (file.isFile()) {
          if (file.name.split('.')[1] === 'css') {
            fs.readFile(
              path.join(__dirname, 'styles', file.name),
              'utf-8',
              function (error, data) {
                if (error) {
                  throw error;
                }

                fs.writeFile(
                  pathToNewStyle,
                  data,
                  { flag: 'a+' },
                  function (error) {
                    if (error) {
                      throw error;
                    }
                  },
                );
              },
            );
          }
        }
      });
    },
  );
}

function createFolderAssets() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    (err) => {
      if (err) throw err;
    },
  );
  copyAssets();
}

function copyAssets() {
  fs.readdir(
    path.join(__dirname, 'assets'),
    { withFileTypes: true },
    function (error, files) {
      if (error) {
        throw error;
      }
      files.forEach((file) => {
        if (!file.isFile()) {
          fs.readdir(
            path.join(__dirname, 'assets', file.name),
            function (error, filesInto) {
              if (error) {
                throw error;
              }

              fs.mkdir(
                path.join(__dirname, 'project-dist/assets', file.name),
                { recursive: true },
                (err) => {
                  if (err) {
                    throw err;
                  }
                  filesInto.forEach((fileIn) => {
                    fs.copyFile(
                      path.join(__dirname, 'assets', file.name, fileIn),
                      path.join(
                        __dirname,
                        'project-dist/assets',
                        file.name,
                        fileIn,
                      ),
                      (err) => {
                        if (err) throw err;
                      },
                    );
                  });
                },
              );
            },
          );
        } else {
          fs.copyFile(
            path.join(__dirname, 'assets', file.name),
            path.join(__dirname, 'project-dist/assets', file.name),
            function (error) {
              if (error) {
                throw error;
              }
            },
          );
        }
      });
    },
  );
}

async function readComponents() {
  try {
    const components = await fs.promises.readdir(
      pathToFolderComponents,
      { withFileTypes: true },
      function (componentFiles) {
        const array = [];
        componentFiles.forEach((compFile) => {
          if (path.extname(compFile.name) === '.html' && compFile.isFile()) {
            array.push(componentFiles);
          }
        });
      },
    );

    let objCompContent = {};

    for (let i = 0; i < components.length; i += 1) {
      const componentFileName = components[i].name;
      const componentPath = components[i].path;
      const componentName = components[i].name.split('.')[0];
      const pathToComponent = path.join(componentPath, componentFileName);

      const componentText = await fs.promises.readFile(pathToComponent, 'utf8');
      objCompContent[`${componentName}`] = `${componentText}`;
    }
    return objCompContent;
  } catch (error) {
    console.log(error);
  }
}

async function createFileHtml() {
  try {
    const componentInfo = await readComponents();
    const fileContent = await fs.promises.readFile(pathToFileTemplate, 'utf8');
    let content = fileContent;

    for (let key in componentInfo) {
      const template = `{{${key}}}`;
      const componentText = componentInfo[key];
      const change = new RegExp(template, 'g');
      content = content.replace(change, componentText);
    }

    await fs.promises.writeFile(pathToNewFileHtml, content);
  } catch (error) {
    console.log(error);
  }
}
