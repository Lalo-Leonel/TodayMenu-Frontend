import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MContainer } from "../../../components/molecules/MContainer";
import { MBox } from "../../../components/molecules/MBox";
import { useNavigate } from "react-router-dom";
import { AButton } from "../../../components/atoms/AButton";
import { getBusinessAll } from "../../../store/businessReducer";

const HomeClient = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const businessAll = useSelector((state) => state.business.currentBusiness);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getBusinessAll()).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">
            Lista de Restaurantes
          </h3>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : businessAll.length === 0 ? (
            <div className="text-center text-2xl">
              Aún no hay restaurantes <span className="text-3xl">😢</span>
            </div>
          ) : (
            businessAll.map((business) => (
              <MBox
                key={business._id}
                className="bg-white p-4 divide-y-2 divide-primary "
              >
                <div className="text-xs flex justify-between">
                  <h3 className="font-semibold text-lg">
                    Nombre del Restaurante: {business.name}
                  </h3>
                  {/* <span className="bg-secondary py-1 rounded-full text-sm px-2 font-bold">
                    Cantidad: 4
                  </span> */}
                </div>
                <div>
                  {/* <h3 className="font-semibold text-lg">Logo:</h3> */}
                  <img
                    src={business.logo}
                    alt=""
                    className=""
                  />
                </div>
                <AButton
                  onClick={() => {
                    navigate(`/menu/request/${business._id}`);
                  }}
                  className="!justify-start bg-red text-red-800"
                >
                  <span className="flex-1 whitespace-nowrap">
                    Solicitar Menú
                  </span>
                </AButton>
                {/* {new Intl.DateTimeFormat('en-US').format(
                    new Date(menu.createdAt),
                  )} */}
              </MBox>
            ))
          )}
        </div>
      </MContainer>
    </>
  );
};

export default HomeClient;
