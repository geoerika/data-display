import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";

function HourlyDataTable(props) {

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <div style = {{ color: "#940031",
                            backgroundColor: '#e8eaf5',
                            fontWeight: 'bold'
                         }}
            >
              <MTableToolbar {...props}/>
            </div>
          )
        }}
        options={{
          pageSize: 10,
          search: true,
          padding: 'dense',
          headerStyle:{ color :'#940031', fontWeight: 'bold' }
        }}
        columns={[
          { title: "Hour", field: "date", cellStyle:{ padding: '10px'} },
          { title: "Impressions", field: "impressions" },
          { title: "Revenue", field: "revenue" },
          { title: "Clicks", field: "clicks" },
          { title: "Events", field: "events" },
        ]}
        data={dataList}
        title="Daily Data"
      />
    </div>
  );
}

export default HourlyDataTable;
