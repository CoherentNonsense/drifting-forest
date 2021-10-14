var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AssetLoader;
(function (AssetLoader) {
    function load_assets(paths) {
        const promises = [];
        paths.forEach((path) => {
            promises.push(load_asset(path));
        });
        return Promise.all(promises);
    }
    AssetLoader.load_assets = load_assets;
    function load_asset(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`assets/${path}`);
            return yield result.text();
        });
    }
    AssetLoader.load_asset = load_asset;
    function load_images(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            paths.forEach((path) => {
                promises.push(load_image(path));
            });
            return Promise.all(promises);
        });
    }
    AssetLoader.load_images = load_images;
    function load_image(path) {
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.src = `assets/${path}`;
        });
    }
    AssetLoader.load_image = load_image;
})(AssetLoader || (AssetLoader = {}));
export default AssetLoader;
