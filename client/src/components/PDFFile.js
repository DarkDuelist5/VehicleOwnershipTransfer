import React from "react";
import {Page, Text, Image, Document} from '@react-pdf/renderer';



const PDFFile = ({obj}) => {
    let a = obj.id.toString();
    let b = obj.buyer.toString();
    let c = obj.seller.toString();
    let d = obj.price.toString();
    d = Number(d);
    let denom = Math.pow(10, 18);
    d = d/(denom);
    return (
        <Document>
            <Page>
            <Text>Car ID is {a}</Text>
            <Text>Date: 0/0/2023 </Text>
            <Text>Buyer: {b}</Text>
            <Text>Seller: {c}</Text>
            <Text>Cost: {d} ETH </Text>
            </Page>
        </Document>
    )
};

export default PDFFile;