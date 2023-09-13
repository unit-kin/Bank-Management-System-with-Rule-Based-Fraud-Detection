import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

import './AdminAnalytics.css'

function AdminAnalytics() {
    const [pieChartData, setPieChartData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found in local storage");
                return;
            }

            try {
                const response1 = await fetch('http://127.0.0.1:5000/api/total-transaction-count', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const response2 = await fetch('http://127.0.0.1:5000/api/fraud-transaction-count', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const totalTransactionCount = await response1.json();
                const fraudulentTransactionCount = await response2.json();

                const transformedData = [
                    {
                        id: 'Transactions',
                        label: 'Transactions',
                        value: totalTransactionCount.count
                    },
                    {
                        id: 'Fraudulent Transactions',
                        label: 'Fraudulent Transactions',
                        value: fraudulentTransactionCount.count
                    }
                ];

                setPieChartData(transformedData);


            

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        // ... rest of your PieChart component
    < div className='pileline'>
    <div style={{height: 350, width:550}} className='piechart'>
    <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>


   
 </div>
    );
}

export default AdminAnalytics;
