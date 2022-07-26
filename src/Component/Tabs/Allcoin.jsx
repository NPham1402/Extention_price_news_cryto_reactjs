import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Allcoin(props) {
  const navigate=useNavigate();
  const columns = [
  { field: 'id', headerName: 'ID',   renderCell:(e)=>e.index, hide: true},
  { field: 'name',type:"text",flex:1, headerName: <span  style={ {color:'#214a88' } }>Coin</span>,renderCell:(params)=>{return <> <Avatar  src={params.row.iconUrl} /><a> {" "+params.row.name+" ("+params.row.symbol+")"}</a></> } },
  { field: 'price', headerName:<span  style={ {color:'#214a88' } }>Price(USD)</span>,  renderCell:(e)=>{return <span  style={ { fontWeight: 'bold',color:'#002358' } }>{"$"+parseFloat(e.row.price).toFixed(2)}</span>  } },
  { field: '24h', headerName: <span  style={ { color:'#214a88' } }>24h %</span> , renderCell:(e)=>{ 
   
      if(e.row.change<0){
        return   <div style={{color:"red"}}>▼ {e.row.change}%</div> 
      }
      else{
        return   <div style={{color:"green"}}>▲ {e.row.change}% </div>  
        
      }
    } },
    { field: 'marketCap',flex:1, headerName: <span  style={ { color:'#214a88' } }>Market Cap (Bilion)</span>,   renderCell:(e)=>{return  <span  style={ { fontWeight: 'bold',color:'#002358' } }> {"$ "+(parseFloat(e.row.marketCap)/1000000000).toFixed(2).toLocaleString()+" Bilion"}</span> } },
 
];

  return (
   <div style={{ height:520, width: '100%' }}>
      <DataGrid
        rows={props.data}
          columns={columns}
          onRowClick  ={rows=>{
            navigate('detail',{state:{uuid:rows.id,symbol:rows.row.symbol}})
          }}
     disableColumnFilter="false"
     hideFooter="true"
     getRowId={(e)=>e.uuid}
      />

    </div>
  )
}
