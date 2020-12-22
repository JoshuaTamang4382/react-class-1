import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import MyFirstComponent from "./component/myFirstComponent"
import DigitalClock from "./digitalClock";
import ApiCall from "./apiCall";
import MySecondComponent from "./component/mySecondComponent";
import MaterialHome from "./material-example/material-home";
import TabUi from "./material-example/tabUI";
import WeatherHome from "./weatherinfo/weatherHome";
import MyFirstHook from "./react-hook/firstHook";
import PrevState from "./component/prevState";
import MyThirdHook from "./react-hook/thirdHook";
import UserProfile from "./react-hook/userProfile";
import TimerApp from "./timer/timerApp";
import ApiCallExampleHook from "./react-hook/api-call-example";
import EffectHookExample from "./react-hook/effectHook";
import CustomDialog from "./timer/customDialog";
import PaginationPageNumber from "./pagination/pagination_pagenumber";

  class Routes extends Component{
      render() {
          return(
              <div>
                    <Router>
                        <Switch>
                            <Route path="/" exact>
                                <MyFirstComponent />
                            </Route>
                            <Route path="/clock" exact>
                                <DigitalClock />
                            </Route>
                            <Route path="/api-call" exact>
                                <ApiCall />
                            </Route>
                            <Route path="/mui" exact>
                                <MaterialHome />
                            </Route>
                            <Route path="/dynamicRoute/:id/:value" exact>
                                <MySecondComponent />
                            </Route>
                            <Route path="/tab" exact>
                                <TabUi />
                            </Route>
                            <Route path="/weather" exact>
                                <WeatherHome />
                            </Route>
                            <Route path="/hook" exact>
                                <MyFirstHook />
                            </Route>
                            <Route path="/inc/d/:id" exact>
                                <PrevState />
                            </Route>
                            <Route path="/third/t/:id" exact>
                                <MyThirdHook />
                            </Route>
                            <Route path="/user" exact>
                                <UserProfile />
                            </Route>
                            <Route path="/effect" exact>
                                <EffectHookExample />
                            </Route>
                            <Route path="/timer" exact>
                                <TimerApp />
                            </Route>
                            <Route path="/dialog" exact>
                                <CustomDialog />
                            </Route>
                            <Route path="/hook-api-call" exact>
                                <ApiCallExampleHook />
                            </Route>
                            <Route path="/pageNumber" exact>
                                <PaginationPageNumber />
                            </Route>
                        </Switch>
                    </Router>
              </div>
          );
      }
  }

export default Routes;