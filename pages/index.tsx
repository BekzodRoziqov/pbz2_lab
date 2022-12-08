import React from "react"
import prisma from "../lib/prisma"
import {Plant, Stuff} from "../types/Company"
import styles from "./styles.module.css"
import {DatePicker, Table, Tabs} from "antd"
import {ColumnsType} from "antd/es/table"
import {GetStaticProps} from "next"
import moment, {Moment} from "moment"

interface BlogProps {
    landedPlant: Plant[]
    stuff: Stuff[]
}

const Blog: React.FC<BlogProps> = ({landedPlant, stuff}) => {
    const {RangePicker} = DatePicker
    const [date, setDate] = React.useState<[Moment, Moment]>([undefined, undefined])

    const stuffColumns: ColumnsType<Stuff> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Graph",
            dataIndex: "graph",
            key: "graph",
            render: (graph: Date) => {
                return moment(graph).format("DD.MM.YYYY, HH:mm")
            }
        }
    ]

    const landedPlantColumns: ColumnsType<Plant> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Land date",
            dataIndex: "land_date",
            key: "land_date"
        },
        {
            title: "Plant age",
            dataIndex: "plant_age",
            key: "plant_age"
        },
        {
            title: "Plant type",
            dataIndex: "plant_type",
            key: "plant_type",
            filters: landedPlant.map((i) => ({
                    text: i.plant_type,
                    value: i.plant_type
                })
            ),
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value: string, record) => record.plant_type === value
        },
        {
            title: "Watering regime",
            dataIndex: "watering_regime",
            key: "watering_regime"
        }
    ]

    return (
        <div className={styles.mainWrapper}>
            <Tabs>
                <Tabs.TabPane tab="Landed Plants" key="item-1">
                    <RangePicker onChange={(val) => setDate(val)}/>
                    <br/>
                    <br/>
                    <Table
                        columns={landedPlantColumns}
                        dataSource={landedPlant.filter((i) => {
                                if (date[0] === undefined && date[1] === undefined) {
                                    return i
                                } else if (moment(i.land_date).isBetween(date[0], date[1])) {
                                    return i
                                }
                            }
                        )}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Stuff" key="item-2">
                    <RangePicker onChange={(val) => setDate(val)}/>
                    <br/>
                    <br/>
                    <Table dataSource={stuff.filter((i) => {
                        if (date[0] === undefined && date[1] === undefined) {
                            return i
                        } else if (moment(i.graph).isBetween(date[0], date[1])) {
                            return i
                        }
                    })} columns={stuffColumns}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
    const landedPlant = await prisma.landedPlant.findMany({})
    const stuff = await prisma.stuff.findMany({})
    return {
        props: {
            landedPlant: JSON.parse(JSON.stringify(landedPlant)),
            stuff: JSON.parse(JSON.stringify(stuff))
        },
        revalidate: 10
    }
}
