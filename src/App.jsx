import { useState, useEffect } from 'react'
import { Formulario } from './components/Formulario'
import { Header } from './components/Header'
import { ListadoPacientes } from './components/ListadoPacientes'

export const App = () => {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLocal = JSON.parse(localStorage.getItem('pacientes'));
      pacientesLocal?.length > 0 && setPacientes(pacientesLocal);
    }
    obtenerLS()
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(pacienteState => pacienteState.id !== id)
    setPacientes(pacientesActualizados);
  }

  return (
    <div className='container mx-auto mt-5'>
      <Header />
      <div className='mt-12 md:flex'>
        <Formulario pacientes={pacientes} setPacientes={setPacientes} paciente={paciente} setPaciente={setPaciente} />
        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} />
      </div>
    </div>
  )
}
