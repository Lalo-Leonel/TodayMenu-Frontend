import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

import { MContainer } from "../../components/molecules/MContainer";
import { MBox } from "../../components/molecules/MBox";
import { MInput } from "../../components/molecules/forms/MInput";
import { ALabel } from "../../components/atoms/ALabel";
import { AButton } from "../../components/atoms/AButton";
import { number } from "yup";
import { createRequest } from "../../store/requestReducer";
import { getMenuByBusiness } from "../../store/menuReducer";

const RequestMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const menus = useSelector((state) => state.menu.currentMenu);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getMenuByBusiness(id)).then(() => {
      setIsLoading(false);
    });
  }, []);
  const schema = object({
    tableNumber: number().required("Numero de mesa es requerido"),
    numberDiner: number().required("Numero de comensales es requerido"),
    secondQuatity1: number().required("Cantidad de segundo es requerido"),
    secondQuatity2: number().required("Cantidad de segundo es requerido"),
    secondQuatity3: number().required("Cantidad de segundo es requerido"),
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
    const payload = {
      ...data,
      secondQuatity: [
        data.secondQuatity1,
        data.secondQuatity2,
        data.secondQuatity3,
      ],
      menu: menus._id,
    };
    dispatch(createRequest(payload)).then(() => {
      navigate("/main");
    });

    reset();
  });

  return (
    <>
      <MContainer>
        <h2 className="text-2xl font-semibold">Solicitar Menú</h2>
      </MContainer>
      <MContainer>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <MBox className="p-4 rounded-lg bg-white">
            <form onSubmit={onSubmit}>
              <MInput
                label="Número de mesa"
                name="tableNumber"
                type="number"
                register={register}
                error={errors.tableNumber?.message}
              />
              <MInput
                label="Número de comensales"
                name="numberDiner"
                type="number"
                register={register}
                error={errors.numberDiner?.message}
              />
              <div className="">
                <div className="flex justify-between items-center mx-48 ">
                  <ALabel className="text-2xl font-medium uppercase">
                    {menus.secondNames[0].name}
                  </ALabel>
                  <MInput
                    label="Cantidad del 1er Segundo"
                    name="secondQuatity1"
                    type="number"
                    register={register}
                    error={errors.secondQuatity1?.message}
                  />
                </div>
                <div className="flex justify-between items-center mx-48">
                  <ALabel className="text-2xl font-medium uppercase">
                    {menus.secondNames[1].name}
                  </ALabel>
                  <MInput
                    label="Cantidad del 2do Segundo"
                    name="secondQuatity2"
                    type="number"
                    register={register}
                    error={errors.secondQuatity2?.message}
                  />
                </div>
                <div className="flex justify-between items-center mx-48">
                  <ALabel className="text-2xl font-medium uppercase">
                    {menus.secondNames[2].name}
                  </ALabel>
                  <MInput
                    label="Cantidad del 3er Segundo"
                    name="secondQuatity3"
                    type="number"
                    register={register}
                    error={errors.secondQuatity3?.message}
                  />
                </div>
                <div className=""></div>
              </div>
              <AButton type="submit">Solicitar Menú</AButton>
            </form>
          </MBox>
        )}
      </MContainer>
    </>
  );
};

export default RequestMenu;
