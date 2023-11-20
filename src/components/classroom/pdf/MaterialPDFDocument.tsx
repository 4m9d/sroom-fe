'use client';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

type Props = { materials: CourseMaterialWorkbook };

const TimestampRegex = /<button[^>]*class="timestamp"[^>]*>.*?<\/button>/g;

Font.register({
  family: 'Pretendard',
  fonts: [
    {
      fontWeight: 'normal',
      src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff'
    },
    {
      fontWeight: 'medium',
      src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff'
    },
    {
      fontWeight: 'semibold',
      src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff'
    },
    {
      fontWeight: 'bold',
      src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff'
    }
  ]
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    margin: 12,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  channel: {
    fontSize: 12,
    fontFamily: 'Pretendard',
    textAlign: 'left',
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontWeight: 'semibold'
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Pretendard',
    fontWeight: 'medium'
  },
  image: {
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'flex-start',
    height: 40,
    objectFit: 'contain'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    color: '#999999'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    color: '#999999'
  }
});

export default function MaterialPDFDocument({ materials }: Props) {
  return (
    <Document>
      <Page style={styles.body}>
        <Image src={'/logo/logo.png'} style={styles.image} />
        <Text style={styles.title}>{materials.course_title}</Text>
        {materials.materials.map((material) => {
          return (
            <>
              <Text style={styles.subtitle}>{material.video_title}</Text>
              <Text style={styles.channel}>{material.channel}</Text>
              <Text style={styles.text}>
                {material.summary_brief.content.replace(TimestampRegex, '')}
              </Text>
            </>
          );
        })}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
