import { useState, useEffect } from "react"
import { Error } from "./Error"
import { generarId } from '../helpers/generarId.js'

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return
    }

    setError(false)

    // objeto paciente
    const objPaciente = { nombre, propietario, email, fecha, sintomas }

    if (paciente.id) {
      //Editando registro
      objPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState);
      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      // Nuevo Registro : Copia del objeto + nuevo paciente
      objPaciente.id = generarId()
      setPacientes([...pacientes, objPaciente])
    }

    // Reiniciar formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">

      <h2 className="font-black text-3xl text-center mb-10">Seguimiento Paciente</h2>
      <p className="text-lg mt-5 text-center">Agrega Pacientes y {''} <span className="text-indigo-600 font-bold ">Administralos</span></p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit} >

        {error && <Error> Todos los campos son obligatorios</Error>}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            id="mascota"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de las mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input
            id="propietario"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input
            id="email"
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Email contacto propietario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de alta</label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Alta</label>
          <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los sintomas" value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}></textarea>
        </div>

        <input
          type="submit"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />

      </form>
    </div>
  )
}
