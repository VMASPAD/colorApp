import { Button } from 'keep-react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font
} from '@react-pdf/renderer'
import Montserrat from '../../../../resources/Fonts/Montserrat-Black.ttf'
function Epdf() {
  return (
    <div className="flex flex-col justify-center items-center">
      <PDFDownloadLink document={<MyDocument />} fileName="Paleta de Colores.pdf">
        <Button>Descargar PDF</Button>
      </PDFDownloadLink>
      <PDFViewer className="h-screen w-screen">
        <MyDocument />
      </PDFViewer>
    </div>
  )
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row'
  }
})
Font.register({ family: 'Montserrat', src: Montserrat })
// Create Document Component
export const MyDocument = () => {
  const gradientColors = JSON.parse(localStorage.getItem('dbColors'))
  console.log(gradientColors)

  return (
    <Document title="Paleta de Colores">
      <Page size="A4" style={styles.page}>
        <View>
          {gradientColors.map((color, index) => (
            <View
              key={index}
              style={{
                margin: 5,
                padding: 10,
                flexGrow: 1,
                height: 50,
                width: 580,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: color.rgb,
                fontSize: 15,
                borderRadius: 5,
                fontFamily: 'Montserrat'
              }}
            >
              <Text style={{ color: color.potencialColor < 75 ? 'white' : 'black' }}>
                {color.rgb}
              </Text>
              <Text style={{ color: color.potencialColor < 75 ? 'white' : 'black' }}>
                {color.hex}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
export default Epdf
