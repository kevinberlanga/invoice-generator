import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export type ItemData = {
  user: {
    id: string;
    email: string;
  };
  listingTitle: string;
  sellingPrice: number;
  itemBrand: string;
  listingDescription: string;
  itemAge: number;
  address: {
    primary: string;
    secondary: string;
    city: string;
    state: string;
    zip: string;
  };
  mileage: number;
  hasServiceRecords: boolean;
  hasRust: boolean;
  tankSize: number;
  pumpSize: number;
  finalPrice: number;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const Invoice = ({ data }: { data: ItemData }) => {
  // const { user, listingTitle, sellingPrice, itemBrand, listingDescription, itemAge, address, mileage, hasServiceRecords, hasRust, tankSize, pumpSize, finalPrice } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
};

export default Invoice;