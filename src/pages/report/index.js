import React from "react";
import Layout from "../../components/layout";
import styles from "./style.module.scss";
import {JugadorContext} from "../../context/jugador";
import { XYPlot, XAxis, YAxis,VerticalGridLines,HorizontalGridLines,VerticalBarSeries } from "react-vis";

class Page extends React.Component{

    render(){
        const {jugador}=this.context;
        return(
            <Layout>
                <div className={styles.container}>
                    <XYPlot 
                        className={styles.xyPlot}
                        width={window.width*0.8}
                        heigth={window.innerHeight}

                    >
                        <VerticalGridLines></VerticalGridLines>
                        <HorizontalGridLines></HorizontalGridLines>
                        <XAxis></XAxis>
                        <YAxis></YAxis>
                        <VerticalBarSeries color="#100" data={[
                            {x:1,y:10},{x:2,y:15},{x:3,y:19}
                        ]}>
                            
                        </VerticalBarSeries>
                    </XYPlot>
                </div>
            </Layout>
        );
    }

}
Page.contextType=JugadorContext
export default Page;