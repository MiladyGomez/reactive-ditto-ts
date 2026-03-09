import axios from '@utils/axiosInstance';

interface FormRequestType {
    [key: string]: any;
}

const contactFormRequest = async (id: number, data: FormRequestType) => {
    var formatedForm = new FormData();
    for (var key in data) {
      formatedForm.append(key, data[key]);
    }
    formatedForm.append("_wpcf7_unit_tag", "wpcf7-f-" + id);
    const response = await axios.post(`contact-form-7/v1/contact-forms/${id}/feedback`, formatedForm)
    return response;
}

export default contactFormRequest;
