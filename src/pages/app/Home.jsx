import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts';

import axios from 'axios';

export const Home = () => {
    const navigate = useNavigate();

    const [directors, setDirectors] = useState([]);
    const [guards, setGuards] = useState([]);
    const [prisoner, setPrisoner] = useState([]);

    const [wards, setWards] = useState([]);
    const [reports, setRepots] = useState([]);

    const token = localStorage.getItem('token');

    const getDirectors = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/director',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setDirectors(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }
    const getGuards = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/guard',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setGuards(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }
    const getPrisoner = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/prisoner',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setPrisoner(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }


    const getWard = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/ward',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.wards)
            setWards(response.data.data.wards)
        } catch (error) {
            console.log(error);
        }
    }
    const getReport = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/report',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.reports)
            setRepots(response.data.data.reports)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDirectors();
    }, [])
    useEffect(() => {
        getGuards();
    }, [])
    useEffect(() => {
        getPrisoner();
    }, [])

    useEffect(() => {
        getWard();
    }, [])
    useEffect(() => {
        getReport();
    }, [])

    return (
        <>
            <div class="container-fluid">
                <div class="page-header">
                    <h1 class="text-titles"><i class="bi bi-people-fill"></i> Informacion <small>DE USUARIOS</small></h1>
                </div>
            </div>
            <div class="full-box text-center">
                <Link to="/Dashboard/directors" class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark">
                        Directores
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-person-lines-fill text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{directors.length}</p>
                        <small>Registrados</small>
                    </div>
                </Link>
                <Link to="/Dashboard/guards" class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark">
                        Guardias
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-shield-shaded text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{guards.length}</p>
                        <small>Registrados</small>
                    </div>
                </Link>
                <Link to="/Dashboard/prisoners" class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark">
                        Prisioneros
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-incognito text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{prisoner.length}</p>
                        <small>Registrados</small>
                    </div>
                </Link>
            </div>

            <div class="container-fluid">
                <div class="page-header">
                    <h1 class="text-titles"><i class="zmdi zmdi-case zmdi-hc-fw"></i> Informacion <small>DEL SISTEMA</small></h1>
                </div>
            </div>
            <div class="full-box text-center">
                <Link to="/jails" class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark">
                        PABELLONES
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-bank2 text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{wards.length}</p>
                        <small>Registrados</small>
                    </div>
                </Link>
                <Link to="/report" class="full-box tile ">
                    <div class="full-box tile-title text-center text-titles text-uppercase bg-dark">
                        Reportes
                    </div>
                    <div class="full-box tile-icon text-center ">
                        <i class="bi bi-file-earmark-richtext-fill text-dark"></i>
                    </div>
                    <div class="full tile-number text-titles text-dark">
                        <p class="full-box">{reports.length}</p>
                        <small>Registrados</small>
                    </div>
                </Link>
            </div>

        </>);
}