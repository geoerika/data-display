import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";

function HourlyDataTable(props) {

  console.log('props in HourlyDatatable: ', props);

  const addDataForHour = (i, array, dataType) => {
    let hourData = array.filter((elem) => {
        return elem.hour === i;
    });

    let sumOfData = hourData.reduce((acc, curElem) => {
        return acc + Number(curElem[dataType]);
    }, 0);
    //round up to 2 decimals
    if(dataType === 'revenue') {
      sumOfData = sumOfData.toFixed(2)
    }
    return sumOfData;
  };

  const createTableData = () => {

    let finalArray = [];
    for (let i = 0; i < 24; i++) {
      finalArray[i] = {};
      finalArray[i].hour = i;
      // creates array of same hour objects
      finalArray[i].impressions = addDataForHour(i, props.statsHourly, 'impressions');
      finalArray[i].revenue = addDataForHour(i, props.statsHourly, 'revenue');
      finalArray[i].clicks = addDataForHour(i, props.statsHourly, 'clicks');
      finalArray[i].events = addDataForHour(i, props.eventsHourly, 'events');
    }
    return finalArray;
  };

  let dataList = createTableData();
  console.log('dataList: ', dataList);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <div style =
              {{ color: "mediumslateblue",
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
          headerStyle:{ color :'mediumslateblue', fontWeight: 'bold' }
        }}
        columns={[
          { title: "Hour", field: "hour", cellStyle:{ padding: '10px'} },
          { title: "Impressions", field: "impressions" },
          { title: "Revenue", field: "revenue" },
          { title: "Clicks", field: "clicks" },
          { title: "Events", field: "events" },
        ]}
        data={dataList}
        title="Hourly Data"
      />
    </div>
  );
}

export default HourlyDataTable;
