import { Avatar, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ApiCallExampleHook(){

    const [newsData,setNewsData]=useState();
    const [pageState,setPageState]=useState({loading:true,error:false,pageData:[]});

    useEffect(()=>{
        getNewsDataFromAPI();
    },[true]);

    function getNewsDataFromAPI(){
        axios.get('http://newsapi.org/v2/everything?domains=wsj.com&apiKey=6d4ead68f76b4fd288a0fd9bab2082d7').then(function(response){
            pageState.pageData=response.data.articles
            pageState.loading=false;
            setPageState({...pageState,pageState});
        }).catch(function(er){
            pageState.error=true;
            setPageState({...pageState,pageState});
        })
    }

    return(
        <div>
            {pageState.loading ? <CircularProgress/>:
            <Grid container spacing={2}>
                {pageState.pageData.map((item)=>
                <Grid item xs="12" sm="6">
                    <a target="_blank" href={item.url} style={{textDecoration:'none'}}>
                    <Card>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                            }
                            
                            title={item.title}
                            subheader={new Date(item.publishedAt).toLocaleString()}
                        />
                        <CardMedia
                            style={{height: 0,
                            paddingTop: '56.25%', }}
                            image={item.urlToImage}
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                    </a>
                </Grid>

                )}
            </Grid>
            }
        </div>
    )
}