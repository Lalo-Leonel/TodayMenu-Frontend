import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";

import { MContainer } from "../../components/molecules/MContainer";
import { MBox } from "../../components/molecules/MBox";
import { MInput } from "../../components/molecules/forms/MInput";
import { AButton } from "../../components/atoms/AButton";
import { createBusiness } from "../../store/businessReducer";
import { getBusinessByUser } from "../../store/businessReducer";
import axios from "axios";

// function handleSubmit(e) {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append('email', 'simon@test');
//     if(file) {
//       formData.append('file', file, file.filename)
//     }
//     // formData.append('profile', file, file.filename)

//     // formData.username = 'simon' X
//     // formData.append('username', 'simon'); V

//     console.log(formData)
//     console.log(formData.get('email'))

//     axios({
//       method: 'POST',
//       baseURL: 'http://localhost:8000',
//       url: '/users/profile',
//       data: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//   }

const CreateBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getBusinessByUser(currentUser._id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const schema = object({
    name: string().required("El nombre de la empresa es requerido"),
    logo: string().required("Logo es requerido"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (file) {
      formData.append("file", file, file.filename);
    }
    // const payload = {
    //   ...data,
    //   logo: formData,
    //   user: currentUser._id,
    // };
    console.log(formData.get("file"));
    // console.log(file);
    // axios({
    //   method: "POST",
    //   baseURL: "http://localhost:8000",
    //   url: "/api/business",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    dispatch(createBusiness(formData)).then(() => {
      navigate("/main");
    });

    reset();
  });
  function handleImage(file) {
    // const fileReader = new FileReader();

    // fileReader.addEventListener('loadstart', () => console.log('generating preview'));
    // fileReader.addEventListener('load', e => setPreview(e.target.result));
    // fileReader.addEventListener('error', err => console.log(err));
    // fileReader.addEventListener('loadend', () => console.log('process ended'))

    // fileReader.readAsDataURL(file);

    const result = URL.createObjectURL(file);
    setPreview(result);
  }

  return (
    <>
      <MContainer>
        <h2 className="text-2xl font-semibold">Ingresar datos de la empresa</h2>
      </MContainer>
      <MContainer>
        <MBox className="p-4 rounded-lg bg-white">
          <form onSubmit={onSubmit}>
            <MInput
              label="Nombre del Restaurante"
              name="name"
              register={register}
              error={errors.name?.message}
            />
            <div className="flex gap-2 justify-between">
              <MInput
                label="Logo"
                name="logo"
                type="file"
                id="image"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  handleImage(e.target.files[0]);
                  // for(const file in e.target.files)
                }}
                register={register}
                error={errors.logo?.message}
              />
              <div className=" w-60">
                {preview && (
                  <img src={preview} alt="preview" width="600" height="600" />
                )}
              </div>
            </div>
            {/* <div className="App">
              <form onSubmit={handleSubmit}>
              <label htmlFor="image">File</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  handleImage(e.target.files[0]);
                  // for(const file in e.target.files)
                }}
              />
              <button type="submit">Send</button>
              </form>
              {preview && <img src={preview} alt="preview" width="600" />}
            </div> */}
            <AButton type="submit">Guardar</AButton>
          </form>
        </MBox>
      </MContainer>
    </>
  );
};

export default CreateBusiness;
