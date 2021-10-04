export function load_assets(paths)
{
  const promises = [];
  paths.forEach((path) => {
    promises.push(load_asset(path));
  });

  return Promise.all(promises);
}

export async function load_asset(path)
{
  if (path.endsWith(".png"))
  {
    return load_image(`assets/${path}`);
  }
  const result = await fetch(`assets/${path}`);
  return await result.text();
}

function load_image(url) {
  return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
          resolve(image);
      });
      image.src = url;
  });
}