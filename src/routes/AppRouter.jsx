import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Login, Forgot_password, Reset_password   } from '../pages';import { } from '../pages';
import { Dashboard } from '../pages/app/Dashboard';
import { Home } from '../pages/app/Home';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';


/* Importaciones de Directores */
import { Directors } from '../pages/directors/Directors';
import { ListDirectors } from '../pages/directors/ListDirectors';
import { ShowDirector } from '../pages/directors/ShowDirector';
import { CreateDirector } from '../pages/directors/CreateDirector';
import { UpdateDirector } from '../pages/directors/UpdateDirector';
/* Importaciones de guardias */
import { Guards } from '../pages/guards/Guards';
import { ListGuards } from '../pages/guards/ListGuards';
import { ShowGuard } from '../pages/guards/ShowGuard';
import { CreateGuard } from '../pages/guards/CreateGuard';
import { UpdateGuard } from '../pages/guards/UpdateGuard';
/* Importaciones de prisioneros */
import { Prisoner } from '../pages/prisoner/Prisoner';
import { ListPrisoner } from '../pages/prisoner/ListPrisoner';
import { ShowPrisoner } from '../pages/prisoner/ShowPrisoner';
import { CreatePrisoner } from '../pages/prisoner/CreatePrisoner';
import { UpdatePrisoner } from '../pages/prisoner/UpdatePrisoner';

/* Importaciones de Carceles */
import { Jails } from '../pages/Jails/Jail';
import { ListJails } from '../pages/Jails/ListJails';
import { ShowJails } from '../pages/Jails/ShowJails';
import { CreateJails } from '../pages/Jails/CreateJail';
import { UpdateJails } from '../pages/Jails/UpdateJails';
/* Importaciones de pabellones */
import { Wards } from '../pages/wards/Wards';
import { ListWards } from '../pages/wards/ListWards';
import { ShowWard } from '../pages/wards/ShowWard';
import { CreateWard } from '../pages/wards/CreateWard';
import { UpdateWard } from '../pages/wards/UpdateWards';
/* Importaciones de reportes */
import { Report } from '../pages/reports/Report';
import { ListReport } from '../pages/reports/ListReport';
import { ShowReport } from '../pages/reports/ShowReport';
import { CreateReport } from '../pages/reports/CreateReport';
import { UpdateReport } from '../pages/reports/UpdateReport';


export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                            <Route path="forgot_password" element={<Forgot_password />} />
                            <Route path="reset_password" element={<Reset_password />} />
                        </Routes>
                    </PublicRoute>
                } />



                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Dashboard />}>
                                <Route index path='/' element={<Home />} />

                                <Route path='reports' element={<Report />} >
                                    <Route index element={<ListReport />} />
                                    <Route path='show/:id' element={<ShowReport />} />
                                    <Route path='create' element={<CreateReport />} />
                                    <Route path='edit/:id' element={<UpdateReport />} />
                                </Route>

                                <Route path='jails' element={<Jails />} >
                                    <Route index element={<ListJails />} />
                                    <Route path='show/:id' element={<ShowJails />} />
                                    <Route path='create' element={<CreateJails />} />
                                    <Route path='edit/:id' element={<UpdateJails />} />
                                </Route>

                                <Route path='wards' element={<Wards />} >
                                    <Route index element={<ListWards />} />
                                    <Route path='show/:id' element={<ShowWard />} />
                                    <Route path='create' element={<CreateWard />} />
                                    <Route path='edit/:id' element={<UpdateWard />} />
                                </Route>

                                <Route path='directors' element={<Directors />} >
                                    <Route index element={<ListDirectors />} />
                                    <Route path='show/:id' element={<ShowDirector />} />
                                    <Route path='create' element={<CreateDirector />} />
                                    <Route path='edit/:id' element={<UpdateDirector />} />
                                </Route>

                                <Route path='guards' element={<Guards />} >
                                    <Route index element={<ListGuards />} />
                                    <Route path='show/:id' element={<ShowGuard />} />
                                    <Route path='create' element={<CreateGuard />} />
                                    <Route path='edit/:id' element={<UpdateGuard />} />
                                </Route>

                                <Route path='prisoners' element={<Prisoner />} >
                                    <Route index element={<ListPrisoner />} />
                                    <Route path='show/:id' element={<ShowPrisoner />} />
                                    <Route path='create' element={<CreatePrisoner />} />
                                    <Route path='edit/:id' element={<UpdatePrisoner />} />
                                </Route>

                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
