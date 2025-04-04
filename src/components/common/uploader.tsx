import React, { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type Props = {
    setImage: (value: File | null) => void; 
};

const Uploader: React.FC<Props> = ({ setImage }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            setImage(newFileList[0].originFileObj as File);
        } else {
            setImage(null);
        }
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src && file.originFileObj) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open("");
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            >
                {fileList.length === 0 && "+ Upload"}
            </Upload>
        </ImgCrop>
    );
};

export default Uploader;
