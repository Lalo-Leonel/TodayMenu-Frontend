import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MContainer } from "../../components/molecules/MContainer";
import { MBox } from "../../components/molecules/MBox";
import { useNavigate } from "react-router-dom";
import { AButton } from "../../components/atoms/AButton";
import { getMenuByUser } from "../../store/menuReducer";

const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menu.currentMenu);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getMenuByUser()).then(() => {
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
          ) : menus.length === 0 ? (
            <div className="text-center text-2xl">
              Aún no tiene pedidos <span className="text-3xl">😢</span>
            </div>
          ) : (
            menus.map((menu) => (
              <MBox
                key={menu._id}
                className="bg-white p-4 divide-y-2 divide-primary "
              >
                <div className="text-xs flex justify-between">
                  <h3 className="font-semibold text-lg">Mesa Número: 1</h3>
                  <span className="bg-secondary py-1 rounded-full text-sm px-2 font-bold">
                    Cantidad: 4
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Segundos:</h3>
                  {menu.secondNames.map((secondName) => (
                    <div
                      key={secondName._id}
                      className="grid grid-cols-2 gap-2"
                    >
                      <span className="text-lg">{secondName.name}:</span>
                      <span className="text-lg">{secondName.quantity}</span>
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

export default HomePage;
