import fs from 'fs';
import path from 'path';
import { camelCaseToDashCase, lowerCaseFirst, upperCaseFirst } from './helpers';
const args = process.argv.slice(2);

if (!args.length) {
  throw new Error('Type a resource name');
}

const resourceName = lowerCaseFirst(args[0]);
const ResourceName = upperCaseFirst(args[0]);
const dashCaseResourceName = camelCaseToDashCase(resourceName);

const modulesPath = path.join(__dirname, '..', '..', 'src', 'modules');
const modulePath = path.join(modulesPath, dashCaseResourceName);

const templatePath = path.join(__dirname, '..', '..', 'core', 'templates');

function parseFileContent(content: string): string {
  const replacers = [
    { from: 'RepositoryName', to: `${ResourceName}Repository` },
    { from: 'repositoryName', to: `${resourceName}Repository` },
    { from: 'ControllerName', to: `${ResourceName}Controller` },
    { from: 'controllerName', to: `${resourceName}Controller` },
    { from: 'ServiceName', to: `${ResourceName}Service` },
    { from: 'serviceName', to: `${resourceName}Service` },
    { from: 'EntityName', to: ResourceName },
    { from: 'entityName', to: resourceName },
    { from: 'entity-name', to: dashCaseResourceName },
  ];

  for (const replacer of replacers) {
    const regex = new RegExp(`\{${replacer.from}\}`, 'g');
    content = content.replace(regex, replacer.to);
  }

  return content;
}

fs.mkdirSync(modulePath);

const filesToCopy: string[] = ['controller', 'entity', 'repository', 'service'];

filesToCopy.map((fileName) => {
  const filePath = path.join(templatePath, fileName);
  const finalPath = path.join(
    modulePath,
    `${dashCaseResourceName}.${fileName}.ts`
  );

  let fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

  fileContent = parseFileContent(fileContent);

  fs.writeFileSync(finalPath, fileContent);
});

process.exit();
