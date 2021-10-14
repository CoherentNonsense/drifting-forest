namespace AssetLoader
{

export function load_assets(paths : string[]) : Promise<string[]>
{
  const promises : Promise<string>[] = [];
  paths.forEach((path : string) => {
    promises.push(load_asset(path));
  });

  return Promise.all(promises);
}

export async function load_asset(path : string) : Promise<string>
{
  const result = await fetch(`assets/${path}`);
  return await result.text();
}

export async function load_images(paths : string[]) : Promise<HTMLImageElement[]>
{
  const promises : Promise<HTMLImageElement>[] = [];
  paths.forEach((path : string) => {
    promises.push(load_image(path));
  });

  return Promise.all(promises);

}

export function load_image(path : string) : Promise<HTMLImageElement>
{
  return new Promise(resolve => {
      const image : HTMLImageElement = new Image();
      image.addEventListener('load', () => {
          resolve(image);
      });
      image.src = `assets/${path}`;
  });
}

}

export default AssetLoader;