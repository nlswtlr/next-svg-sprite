import fs from "fs";
import path from "path";
import { exec } from "child_process";

const tasks = [
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "pages",
        children: [
          {
            type: "file",
            name: "index.jsx",
            template: "index.jsx",
          },
        ],
      },
    ],
  },
  {
    type: "file",
    name: "package.json",
    template: "package.json",
  },
];

const rootFolder = ".testcase";

(async () => {
  fs.rmdirSync(path.resolve(__dirname, rootFolder), { recursive: true });
  fs.mkdirSync(path.resolve(__dirname, rootFolder));

  tasks.forEach((task) => create(task, rootFolder));
  console.log("[✓] folder structure created");

  exec(`cd ${path.resolve(__dirname, rootFolder)} && npm install`, (err, stdout, stderr) => {
    if (err) {
      throw new Error("unable to install testcase npm packages");
    }
    console.log("[✓] npm packages installed");
  });
})();

function create(task, basePath) {
  let taskBasePath = basePath;

  if (task.type === "folder") {
    fs.mkdirSync(path.resolve(__dirname, basePath, task.name));

    if (task.children && task.children.length) {
      taskBasePath = `${basePath}/${task.name}`;
    }
  } else if (task.type === "file") {
    fs.writeFileSync(
      path.resolve(__dirname, basePath, task.name),
      fs.readFileSync(path.resolve(__dirname, "templates", task.template))
    );
  }

  if (task.children && task.children.length) {
    task.children.forEach((task) => create(task, taskBasePath));
  }
}
