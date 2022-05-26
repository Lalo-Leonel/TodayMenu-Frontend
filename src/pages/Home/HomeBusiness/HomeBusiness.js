import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MContainer } from "../../../components/molecules/MContainer";
import { MBox } from "../../../components/molecules/MBox";
import { useNavigate } from "react-router-dom";
import { AButton } from "../../../components/atoms/AButton";
import { getMenuAll } from "../../../store/menuReducer";
import { getRequestByBusiness, getRequestAll } from "../../../store/requestReducer";
import { getBusinessByUser } from "../../../store/businessReducer";

const HomeBusiness = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const requests =  useSelector((state)=> state.request.currentRequest);
  console.log(requests);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getRequestByBusiness(currentUser._id)).then(() => {
      setIsLoading(false);
    });
  }, []);


  return (
    <>
      <MContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-primary font-semibold text-lg">Mis Pedidos</h3>
          <button
            className=" bg-primary text-white px-3 py-1 rounded"
            onClick={() => {
              navigate("/business/create");
            }}
          >
            Agregar Datos
          </button>
          <button
            className=" bg-primary text-white px-3 py-1 rounded"
            onClick={() => {
              navigate("/menu/create");
            }}
          >
            Publicar Menu
          </button>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : requests === null ? (
            <div className="text-center text-2xl">
              Aún no tiene pedidos <span className="text-3xl">😢</span>
            </div>
          ) : (
            requests.map((request) => (
              <MBox
                key={request._id}
                className="bg-white p-4 divide-y-2 divide-primary "
              >
                <div className="text-xs flex justify-between">
                  <h3 className="font-semibold text-lg">Mesa Número: {request.tableNumber}</h3>
                  <span className="bg-secondary py-1 rounded-full text-sm px-2 font-bold">
                    Cantidad: {request.numberDiner}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Segundos:</h3>
                  {request.menu.secondNames.map((secondName, index) => (
                    <div
                      key={secondName._id}
                      className="grid grid-cols-2 gap-2"
                    >
                      <span className="text-lg">{secondName.name}:</span>
                      <span className="text-lg">{request.secondQuatity[index]}</span>
                    </div>
                  ))}

                </div>
                <AButton
                  onClick={() => {
                    // navigate('/servicio/finalizar/');
                  }}
                  className="!justify-start bg-red text-red-800"
                >
                  <span className="flex-1 whitespace-nowrap">Atendido</span>
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

export default HomeBusiness;
