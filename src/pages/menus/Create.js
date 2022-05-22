import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";

import { MContainer } from "../../components/molecules/MContainer";
import { MBox } from "../../components/molecules/MBox";
import { MInput } from "../../components/molecules/forms/MInput";
import { MSelect } from "../../components/molecules/forms/MSelect";
import { AButton } from "../../components/atoms/AButton";
import { number } from "yup";
import { createMenu } from "../../store/menuReducer";

const CreateMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = object({
    typeMenu: string().required("Tipo de menu es requerido"),
    cost: number().required("Precio es requerido"),
    soupNames: string().required("Nombre de la sopa es requerido"),
    secondName1: string().required("Nombre del segundo es requerida"),
    secondName2: string().required("Nombre del segundo es requerida"),
    secondName3: string().required("Nombre del segundo es requerida"),
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
      secondNames: [
        { name: data.secondName1 },
        { name: data.secondName2 },
        { name: data.secondName3 },
      ],
    };
    dispatch(createMenu(payload)).then(() => {
      navigate("/main");
    });

    reset();
  });
  const typeMenuOption = [
    { label: "Desayuno", value: "breakfast" },
    { label: "Almuerzo", value: "lunch" },
    { label: "Cena", value: "dinner" },
  ];

  return (
    <>
      <MContainer>
        <h2 className="text-2xl font-semibold">Crear Menú</h2>
      </MContainer>
      <MContainer>
        <MBox className="p-4 rounded-lg bg-white">
          <form onSubmit={onSubmit}>
            <MInput
              label="Costo"
              name="cost"
              type="number"
              register={register}
              error={errors.cost?.message}
            />
            <MInput
              label="Nombre de la sopa"
              name="soupNames"
              register={register}
              error={errors.soupNames?.message}
            />
            <div className="flex gap-2 justify-between">
              <MInput
                label="Nombre del 1er Segundo"
                name="secondName1"
                register={register}
                error={errors.secondName1?.message}
              />
              <MInput
                label="Nombre del 2do Segundo"
                name="secondName2"
                register={register}
                error={errors.secondName2?.message}
              />
              <MInput
                label="Nombre del 3er Segundo"
                name="secondName3"
                register={register}
                error={errors.secondName3?.message}
              />
            </div>
            <MSelect
              label="Tipo de Menú"
              name="typeMenu"
              options={typeMenuOption}
              labelKey="label"
              register={register}
              error={errors.typeMenu?.message}
            />
            <AButton type="submit">Publicar Menu</AButton>
          </form>
        </MBox>
      </MContainer>
    </>
  );
};

export default CreateMenu;
