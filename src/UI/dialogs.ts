import Swal from "sweetalert2";
export const showSuccessDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
  });
};
export const showErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
  });
};


export const showSuccessCreate = (text: string, title: string) => {
  return Swal.fire({
    text,
    title,
    icon: "success",
    showConfirmButton: false,
    timer: 2000
  });
};


const dialogs = { success: showSuccessDialog, error: showErrorDialog, create: showSuccessCreate };
export default dialogs;