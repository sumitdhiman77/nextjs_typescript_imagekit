import FileUpload from "./FileUpload";

const Upload = () => {
  return (
    <FileUpload
      fileType="video"
      onSuccess={(res) => console.log("Upload successful:", res)}
    />
  );
};
export default Upload;
