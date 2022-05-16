import React from "react";
import "./dashboard.css";
import {BrowserRouter as Router,Routes,Route,Navigate,Link,Outlet,useParams,NavLink,useNavigate,useLocation} from 'react-router-dom'

function Dashboard(){
    const navigate = useNavigate();
    return(
        <div class="row">
        <div class="pricing-card col-lg-4 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-header">Covid Cases around you</h3>
                </div>
                <div class="card-body">
                    <h2 class="pricing-text">Statistical Analysis of Covid Cases</h2>

                    <button onClick={() => navigate('/cases')} className="btn btn-outline-dark col-12 btn-lg">Covid Cases</button>
                </div>
            </div>
        </div>

        <div class="pricing-card col-lg-4 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-header">Vaccination</h3>
                </div>
                <div class="card-body">
                    <h2 class="pricing-text">Statistical Analysis of Vaccination</h2>

                    <button type="button" className="btn btn-outline-dark col-12 btn-lg">Total Vaccination</button>
                </div>
            </div>
        </div>

        <div class="pricing-card col-lg-4 col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-header">Prediction and Visualization</h3>
                </div>
                <div class="card-body">
                    <h2 class="pricing-text">Data Visualization and future prediction</h2>

                    <button type="button" className="btn btn-outline-dark col-12 btn-lg">Predictor and Analyser</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;