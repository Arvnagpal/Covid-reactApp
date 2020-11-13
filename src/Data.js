import React from 'react';
import ReactDOM from 'react-dom';
import './Data.css';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
 
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class Data extends React.Component {
        constructor() {
          super();
          this.state = {
            color: "red",
            isLoaded:false,
            items:[]
          };
        }

        componentDidMount() {
            var today = new Date();
            var dd = today.getDate();
            
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 
            
            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = dd+'/'+mm+'/'+yyyy;
            this.setState({color: today });

            fetch('https://api.covid19api.com/summary')
            .then(response => response.json())
            .then(data =>  this.setState({ items: data }));

          }


        render() {
          console.log(this.state);
          return(
       <div>       
          <h1 class="text-center dateClass">Date : {this.state.color} </h1> 
          <div class="row wow">
            <div class="col-sm-5 add-on text-center card bg-info text-white">
          <div class="card-body">the globally NewConfirmed count : {this.state.items.Global && this.state.items.Global.NewConfirmed}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">the globally TotalConfirmed count : {this.state.items.Global && this.state.items.Global.TotalConfirmed}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">the globally NewDeaths count : {this.state.items.Global && this.state.items.Global.NewDeaths}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">the globally TotalDeaths count : {this.state.items.Global && this.state.items.Global.TotalDeaths}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">the globally NewRecovered count : {this.state.items.Global && this.state.items.Global.NewRecovered}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">the globally TotalRecovered count : {this.state.items.Global && this.state.items.Global.TotalRecovered}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">USA TotalConfirmed Covid19 cases : {this.state.items.Global && this.state.items.Countries[181].TotalConfirmed}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">Macao, SAR China and Réunion TotalConfirmed Covid19 cases : 0</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">USA TotalDeaths Covid19 cases : {this.state.items.Global && this.state.items.Countries[181].TotalDeaths}</div>
            </div>   
            <div class="col-sm-5 add-on text-center card bg-info text-white">
              <div class="card-body">Macao, SAR China and Réunion TotalDeaths Covid19 cases : 0</div>
            </div>   
          </div>
          <div class="addpad">
          <MaterialTable
          icons={tableIcons}
      title="Covid 19 current statistics for all countries"
      columns={[
        { title: 'Country', field: 'Country' },
        { title: 'NewConfirmed', field: 'NewConfirmed' },
        { title: 'TotalConfirmed', field: 'TotalConfirmed'},
        { title: 'NewDeaths', field: 'NewDeaths' },
        { title: 'TotalDeaths', field: 'TotalDeaths' },
        { title: 'NewRecovered', field: 'NewRecovered'},
        { title: 'TotalRecovered', field: 'TotalRecovered'},
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]}
      data={this.state.items.Countries}        
      actions={[
        {
          icon: '⇩',
          tooltip: 'Covid19',
         // onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
    />
          </div>
        </div>
          ) 
        }
      }

export default Data;