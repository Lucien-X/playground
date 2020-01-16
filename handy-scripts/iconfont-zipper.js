/**
 * iconfont批量打包下载脚本,
 * 使用Chrome内核浏览器，
 * F12打开控制台，在console一栏中粘贴后回车，
 * 稍等片刻即可打包下载
 */

(() => {
  // 这里指定要批量下载的图标库ID
  const ID = 20331;
  const loadJS = (url, implementationCode, location) => {
    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    location.appendChild(scriptTag);
  };
  const callback = () => {
    console.log('[iconfont-zipper] 依赖脚本加载完成，获取数据中...');
    fetch(`https://www.iconfont.cn/api/collection/detail.json?id=${ID}`).then(async resp => {
      const { data } = await resp.json();
      const { icons } = data;
      const zip = new JSZip();
      icons.forEach(icon => {
        const { name, show_svg: content } = icon;
        zip.file(`${name}.svg`, content);
      });
      zip.generateAsync({ type: 'blob' }).then(content => {
        const filename = `${ID}.zip`;
        const eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        eleLink.href = URL.createObjectURL(content);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
        console.log(`[iconfont-zipper] 成功获取${icons.length}个svg，正在保存到${filename}文件`);
      });
    });
  };
  console.log('[iconfont-zipper] 依赖脚本加载中...');
  loadJS('https://cdn.bootcss.com/jszip/3.2.2/jszip.min.js', callback, document.body);
})();
