import React from 'react';
import Chart from 'react-apexcharts'

const DetailsInfo = (
  {
    font_size, 
    color,
    border_right = true,
    title,
    figure,
    w
  }
  ) => {
    if (!font_size) {
      font_size = '23px'
    }
    if (!color) {
      color = '#505560';
    }
    if (!w) {
      w = '90px'
    }
  return (
    <div 
      className={border_right ? 'details_border_right details_info_container' : 'details_info_container'}
      style={{width: w }}
      >
        <p className="details_info_title upper">{title}</p>
        <p 
          style={{fontSize: font_size, color: color, textTransform: 'capitalize'}}
        >{figure}</p>
    </div>
  )
}

const BlockCateDetails = (
  {
    title,
    showImg = false,
    keyName,
    value,
    active = false,
    fn
  }
) => (
  <div className="bNc_container">
    <div className="bnc_sub_container">
      <div className="flex-center">
      {
          showImg ? 
          <div className="bnc_key_margin">
            <img src={require('../assets/images/vector.svg')} alt="category_icon" width="100%" height="auto"/>
          </div>
          :
          ''
        }
      <div className="bnc_key_margin bnc_key_text_cont">
        <div className="flex flex-row">
          <p className="capitalize bNc_title">{title}</p>
        </div>
        <div className="flex flex-row w-100">
          <p className="bNc_keyname capitalize">{keyName}:</p>
          <p className="bNc_value">{value}</p>
        </div>
      </div>
      </div>
      <div className="flex flex-col">
        <div className="bNc_options" onClick={() => fn()}>
          <div className={active ? "bNc_more_options bNc_active_bg" : "bNc_more_options"}>
            <i className="lni lni-more"></i>
            <div className={active ? "bNc_options_toggle" : "bNc_options_toggle d-none"}>
              <div className="">
                <div className="flex flex-row bNc_action_item">
                  <i className="lni lni-cog"></i>
                  <p>Edit</p>
                </div>
                <div className="flex flex-row bNc_action_item">
                <i className="lni lni-trash"></i>
                  <p>Delete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bNc_spiral_cont">
          {
            showImg ?
            <img src={require('../assets/images/spiral_2.png')} alt="spiral" width="100%" height="auto"/>
            :
            <img src={require('../assets/images/spiral_3.png')} alt="spiral" width="100%" height="auto"/>
          }

        </div>
      </div>
    </div>
  </div>
)

const PieGraph = ({options, series, width, labels}) => {
  if (!options) {
    options = {
      labels: labels || [],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '35%'
          },
          customScale: 0.8
        }
      }
    }
  }
  return (
    <div className="donut_chart_container">
      <div className="donut_chart_content">
        <p className="donut_chart_title">Title</p>
        <Chart options={options} series={series} type="donut" width={width}/>
      </div>
    </div>
    )
}

const LineGraph = ({options, series, labels}) => {
  if (!options) {
    options = {
      labels: labels || [],
      stroke: {
        curve: 'straight',
        width: 1,
        lineCap: 'butt',
      },
    }
  }

  return (
    <div>
      <div>
        <Chart type="line" options={options} series={series}/>
      </div>
    </div>
  )
}
export {
  DetailsInfo,
  BlockCateDetails,
  PieGraph,
  LineGraph,
}