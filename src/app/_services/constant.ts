import {environment} from '../../environments/environment';
var BASE_URL = environment.api_url;
export const mergepdf = environment.mergeapi_url + "uploadpdf";
export const constant = {
    "pdf_modules" : BASE_URL+ "drager_pdf_modules",
};  