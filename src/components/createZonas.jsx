import React from "react";
import { useForm } from "react-hook-form";
import {createZona} from "../api/api.js"

const CreateZonas = ({ zonaData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 // const onSubmit = (data) => console.log(data);

 console.log(zonaData)


 const coordenadasFormateadas = zonaData?.flat().map(coord => {
    // Asegúrate de que coord es un objeto con las propiedades lat y lng
    if (coord && coord.lat !== undefined && coord.lng !== undefined) {
      return { lat: coord.lat, lng: coord.lng };
    } else {
      console.error("Coordenada inválida", coord); // Muestra la coordenada si es inválida
      return null; // Retorna null si la coordenada no es válida
    }
  }).filter(coord => coord !== null); // Filtra las coordenadas inválidas
  

 const onSubmit = (data) => {
    const horario = {
      lunes: {
        apertura: data.lunesA || "",
        cierre: data.lunesB || ""
      },
      martes: {
        apertura: data.martesA || "",
        cierre: data.martesB || ""
      },
      miercoles: {
        apertura: data.miercolesA || "",
        cierre: data.miercolesB || ""
      },
      jueves: {
        apertura: data.juevesA || "",
        cierre: data.juevesB || ""
      },
      viernes: {
        apertura: data.viernesA || "",
        cierre: data.viernesB || ""
      },
      sabado: {
        apertura: data.sabadoA || "",
        cierre: data.sabadoB || ""
      },
      domingo: {
        apertura: data.domingoA || "",
        cierre: data.domingoB || ""
      }
    };
  
    const { nombre, color } = data;

    const payload = {
      nombre,
      color,
      horario,
      coordenadas:coordenadasFormateadas
    };
  
    console.log("Payload final:", payload);
    createZona(payload);
  };
  





  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="pb-2">
          <h3 className="font-bold text-lg">Registrar zona</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-row w-full">
    
            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex gap-1">
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    {...register("nombre")}
                    type="input"
                    required
                    placeholder="nombre de zona"
                    minlength="3"
                    maxlength="30"
                  />
                </label>
                <p className="text-xs">
                  {errors.nombre && <span>Nombre requerido</span>}
                </p>
              </div>

              <div className="flex gap-1">
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    {...register("color")}
                    type="color"
                    required
                    placeholder="Color de zona"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                  />
                </label>
                <p className="validator-hint text-xs">
                  Debe contar con almenos 3 caracteres
                </p>
              </div>
            </div>
            
            {/** horarios */}
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex">
                  <div className="w-1/7"></div>
                  <div className="w-3/7">Apertura</div>
                  <div className="w-3/7">Cierre</div>
                </div>

                {/* lunes */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> lunes: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("lunesA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("lunesB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Martes */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> Martes: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("martesA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("martesB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Miercoles */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> Miercoles: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("miercolesA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("miercolesB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Jueves */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> jueves: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("juevesA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("juevesB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Viernes */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> Viernes: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("viernesA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("viernesB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Sabado */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> Sabado: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("sabadoA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("sabadoB")} type="time" />
                    </label>
                  </div>
                </div>
                {/* Domingo */}
                <div className="flex w-full gap-2">
                  <div className="w-1/7 flex items-center"> Domingo: </div>
                  <div className="flex w-6/7 gap-2">
                    <label className="input validator">
                      <input {...register("domingoA")} type="time" />
                    </label>
                    <label className="input validator">
                      <input {...register("domingoB")} type="time" />
                    </label>
                  </div>
                </div>


              </div>
            </div>

          </div>

          <div>
            <input type="submit" />
          </div>
        </form>


        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateZonas;
