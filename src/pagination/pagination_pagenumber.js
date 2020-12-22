import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Axios from 'axios';
import { Avatar, Card, CardContent, CardHeader, CardMedia, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';

export default function PaginationPageNumber() {

    const [pageState,setPageState]=useState({pageNumber:0,
        isLoading:true,isError:false,pageData:[],totalPage:10,pageSize:10
    })

    const handleChangePage = (event, newPage) => {
        pageState.pageNumber=newPage-1;
        setPageState({...pageState,pageState});
      };
    
    useEffect(()=>{
        getData();
    },[pageState.pageNumber]);

    const handleChange = (event) => {
        pageState.pageSize=event.target.value;
        setPageState({...pageState,pageState});
        getData();
      };

    const getData=()=>{
        Axios.get('https://api.instantwebtools.net/v1/passenger?page='+pageState.pageNumber+'&size='+pageState.pageSize).then(function(response){
            pageState.isLoading=false;
            pageState.pageData=response.data.data;
            pageState.totalPage=response.data.totalPages;
            setPageState({...pageState,pageState});
        })
    }
    return(
        <div style={{maxWidth:700,margin:'auto'}}>
            <div>
            <FormControl >
                <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth={true}
                value={pageState.pageSize}
                onChange={handleChange}
                >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div>
                {pageState.isLoading? <CircularProgress/>:
                    pageState.pageData.map((item)=>
                    <Card style={{marginTop:20}}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                            }
                            title={item.name}
                            subheader={"Trip:"+item.trips}
                        />
                    </Card>
                    )
                }
            </div>
            <div style={{margin:'20px 0px'}}>
                <Pagination count={10}
                onChange={handleChangePage}
                variant="outlined" 
                color="primary" />
            </div>
        </div>
    )
}