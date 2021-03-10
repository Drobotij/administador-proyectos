import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/Listado';
import UnirseProyecto from '../proyectos/UnirseProyecto';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>Task</span></h1>

            <NuevoProyecto />
            <UnirseProyecto />
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListadoProyectos />
            </div>
        </aside>
    );
}
 
export default Sidebar;