import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DatabaseBackup } from "lucide-react";
import { PacmanLoader } from "react-spinners";

// Estilos de PrimeReact
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function ProgramRouter() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
        conductor: { value: null, matchMode: FilterMatchMode.CONTAINS },
        telefono: { value: null, matchMode: FilterMatchMode.CONTAINS },
        vehiculo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        placa: { value: null, matchMode: FilterMatchMode.CONTAINS },
        capacidad: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const transformData = (apiData) => {
        return apiData.map(item => ({
            id: item._id,
            fecha: item.fecha ? new Date(item.fecha).toISOString().split('T')[0] : 'N/A',
            conductor: `${item.conductor_id.nombres} ${item.conductor_id.apellidos}`,
            telefono: item.conductor_id.telefono,
            vehiculo: `${item.vehiculo_id.marca} ${item.vehiculo_id.modelo}`,
            placa: item.vehiculo_id.placa,
            capacidad: item.vehiculo_id.capacidad_carga
        }));
    };

    useEffect(() => {
        setLoading(true);
        
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:5100/api/rutas");
                const json = await result.json();
                const transformedData = transformData(json);
                setData(transformedData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <InputText
                        value={filters.global.value}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar rutas"
                        className="w-full"
                    />
                </span>
            </div>
        );
    };

    const capacidadBodyTemplate = (rowData) => {
        return `${rowData.capacidad} kg`;
    };

    const header = renderHeader();

    return (
        <div className="flex flex-col min-h-screen">
            {loading ? (
                <div className="flex-1 flex justify-center items-center pb-50">
                    <PacmanLoader />
                </div>
            ) : data.length > 0 ? (
                <div className="p-4 md:p-8 lg:p-12">
                    <div className="card">
                        <DataTable
                            value={data}
                            paginator
                            rows={2}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            tableStyle={{ minWidth: '50rem' }}
                            filters={filters}
                            filterDisplay="row"
                            loading={loading}
                            header={header}
                        >
                            <Column 
                                field="fecha" 
                                header="Fecha" 
                                filter 
                                filterPlaceholder="Buscar por fecha"
                                style={{ minWidth: '20rem' }} 
                            />
                            <Column 
                                field="conductor" 
                                header="Conductor" 
                                filter 
                                filterPlaceholder="Buscar conductor"
                                style={{ minWidth: '20rem' }}
                            />
                            <Column 
                                field="telefono" 
                                header="Teléfono" 
                                filter 
                                filterPlaceholder="Buscar teléfono"
                                style={{ minWidth: '17rem' }}
                            />
                            <Column 
                                field="vehiculo" 
                                header="Vehículo" 
                                filter 
                                filterPlaceholder="Buscar vehículo"
                                style={{ minWidth: '20rem' }}
                            />
                            <Column 
                                field="placa" 
                                header="Placa" 
                                filter 
                                filterPlaceholder="Buscar placa"
                               style={{ minWidth: '15rem' }}
                            />
                            <Column 
                                field="capacidad" 
                                header="Capacidad" 
                                filter
                                filterPlaceholder="Buscar capacidad"
                                filterMatchMode="contains"
                                body={capacidadBodyTemplate}
                                style={{ minWidth: '15rem' }}
                            />
                            <Column
                                body={() => (
                                    <button className="p-button p-component">
                                        <span className="p-button-icon p-c pi pi-pencil"></span>
                                    </button>
                                )}
                            />
                            <Column
                                body={() => (
                                    <button className="p-button p-component p-button-danger">
                                        <span className="p-button-icon p-c pi pi-trash"></span>
                                    </button>
                                )}  
                            />
                        </DataTable>
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 flex-col w-full items-center justify-center pb-50">
                    <h1 className="text-4xl font-semibold">No hay datos</h1>
                    <DatabaseBackup size={64} />
                </div>
            )}
        </div>
    );
}

export default ProgramRouter;