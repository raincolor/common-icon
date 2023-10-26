/**
 * 去掉resources中svg文件的宽高定义、生成对应的组件vue和index.ts到packages/components下
 * 由于这一步必须在vite编译之前完成，所以必须用同步接口
 */
import fs = require('fs');
import p = require('path');

// Logger
const l = (msg: string): void => console.log(`tcwicons - ${msg}`);

function saveSvgFile(svgDir, svgOutRoot, svgOutFolder, comOutDir, fileName, template) {
  const svg = fs.readFileSync(p.join(svgDir,fileName),'utf8');
  // 去掉svg图片中的宽高设置,写入到packages/svg/xxx/文件夹中
  var result = svg.replace(/ width=['"](\d)+(px)?['"]/, '').replace(/ height=['"](\d)+(px)?['"]/, '');
  const svgOutDir = p.join(svgOutRoot, svgOutFolder);
  if (fs.existsSync(svgOutDir)) {
    fs.writeFileSync(p.join(svgOutDir, fileName), result, 'utf8');
  }else{
    fs.mkdirSync(svgOutDir);
    fs.writeFileSync(p.join(svgOutDir, fileName), result, 'utf8');
  }
  
  //根据模板写入组件到packages/components文件夹中
  // const t = template;
  const svgName = fileName.split('.')[0];
  const names = svgName.split(' ');
  let comName = 'Icon';
  for(let n of names){
    comName += n.replace(n[0], n[0].toUpperCase())
  }
  const data = template.replace('${folder}', svgOutFolder).replace('${svgName}', svgName).replace('${ComponentName}', comName);
  fs.writeFileSync(p.join(comOutDir, `${comName}.vue`), data, 'utf8');
  return comName;
}

const comNames = [];

function checkComName(name){
  if(comNames.includes(name)){
    console.warn('Duplicate component name:', name);
  }else{
    comNames.push(name);
  }
}

// 删除文件夹目录下的vue文件
function deleteVueFiles(dir){
  const files = fs.readdirSync(dir);
  for (const file of files){
    if(/\.vue$/.test(file)){
      fs.rmSync(p.join(dir, file), {force: true});
    }
  }
}

function start(dir = '.'): void {
  const svgDir = p.join(dir, 'resources')
  const templatePath = p.join(dir, 'scripts/com-template.txt');
  const svgOutDir = p.join(dir, 'packages/svg');
  const comOutDir = p.join(dir, 'packages/components');

  try {
    // 组件导出index的内容
    let componentIndexData = 'import \'./index.less\';\n';
    const categories = {};
    
    // 先删除comOutDir下的vue文件
    deleteVueFiles(comOutDir); 

    // 根据模板写如组件文件packages/components/IconXxx.vue
    const template = fs.readFileSync(templatePath, 'utf8')
    const files = fs.readdirSync(svgDir);
    for (const file of files){
      if(/\.svg$/.test(file)){
        const folder = 'other';
        const comName = saveSvgFile(svgDir, svgOutDir, folder, comOutDir, file, template);
        checkComName(comName);
        //添加组件导出内容
        componentIndexData +=  `export { default as ${comName} } from './${comName}.vue';\n`;
        //写入组件分类
        if(!categories[folder]) categories[folder] = [];
        categories[folder].push(comName);
      }else{
        if(!categories[file]) categories[file] = [];
        const realDir = p.join(svgDir, file);
        const innerFiles = fs.readdirSync(realDir);
        for(const item of innerFiles){
          const comName = saveSvgFile(realDir, svgOutDir, file,  comOutDir, item, template);
          checkComName(comName);
          //添加组件导出内容
          componentIndexData +=  `export { default as ${comName} } from './${comName}.vue';\n`;
          //写入组件分类
          categories[file].push(comName);
        }
      }
    }

    // 写入packages/components/index.ts文件
    fs.writeFileSync(p.join(comOutDir, `index.ts`), componentIndexData, 'utf8');

    // 写入packages/components/icons-categories.json文件（icon分类）
    const iconsCategories = {
      categories: [] as {name: string, items: string[]}[]
    }
    for(let key in categories){
      iconsCategories.categories.push({name: key, items: categories[key] || []})
    }
    fs.writeFileSync(p.join(comOutDir, `icons-categories.json`), JSON.stringify(iconsCategories), 'utf8');
    
  } catch (e) {
    l('tcwicons failed to create svg components');
    throw e;
  }

  l('create components success, build it now...');
}

const [, ,...args] = process.argv
const [x] = args
// Run CLI
try {
  // Run command or show usage for unknown command
  start(x)
} catch (e) {
  console.error(e instanceof Error ? `tcwicons - ${e.message}` : e)
  process.exit(1)
}