//component EditOrderArea

import React from "react";
import GridLayout from "react-grid-layout";
import {API_ROOT} from "../constants";
function EditOrderArea({toggleOrderScreen, newsSources}) {
  let layout = newsSources.sort((a, b) => a.list_number - b.list_number).map((newsSource, index) => {
    return {
      i: newsSource.source_id.toString(), // assuming id is unique
      x: index % 3, // will give values 0, 1, 2 for each row
      y: Math.floor(index / 3), // will increment after every 3 columns
      w: 1,
      h: 1
    };
  });
  
  const renderSourceDivs = () => {
    return newsSources.map((newsSource) => {
      return (
        <div key={newsSource.source_id.toString()} className="edit-order-entry">{newsSource.source_name}</div>
      )
    });
  }
  
  const updateLayout = (layout) => {
    console.log(layout);
    let orderedLayout = layout.sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x;
      } else {
        return a.y - b.y;
      }
    });
    let layoutParam = orderedLayout.map((layoutItem, index) => {
      return {
        id: layoutItem.i,
        list_order: index
      };
    });
    fetch(API_ROOT + '/news_sources/update_layout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({layout_order: layoutParam}),
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={3}
      rowHeight={30}
      autoSize={true}
      width={1200}
      onLayoutChange={(layout) => {updateLayout(layout)}}
    >
      {renderSourceDivs()}
    </GridLayout>
  )
}

export default EditOrderArea;