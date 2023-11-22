'use client';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View
} from '@react-pdf/renderer';
import { Token, marked } from 'marked';

type Props = { materials: CourseMaterialWorkbook };

const TimestampRegex = /<button[^>]*class="timestamp"[^>]*>.*?<\/button>/g;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    margin: 12,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Pretendard',
    fontSize: 12
  },
  logo: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
    height: 20,
    objectFit: 'contain'
  },
  title: {
    fontSize: 18,
    lineHeight: 1.5,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 30,
    paddingBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#FA5B3E'
  },
  subtitle: {
    display: 'flex',
    lineHeight: 1.3,
    flexDirection: 'row',
    borderColor: '#111111',
    paddingLeft: 5,
    borderLeftWidth: 3,
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 8,
    marginTop: 30
  },
  unavailable: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginVertical: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 3
  },
  video_index_container: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#111111',
    borderRadius: 3,
    minWidth: 20
  },
  video_index: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  video_title: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 5
  },
  section_heading: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'semibold',
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: '#F7F7F7',
    borderRadius: 3
  },
  channel: {
    fontSize: 11,
    textAlign: 'left',
    fontWeight: 'medium'
  },
  paragraph: {
    textAlign: 'left',
    fontWeight: 'medium',
    lineHeight: 1.2
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#999999',
    fontWeight: 'normal'
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  h4: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3
  },
  h5: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2
  },
  ul: {
    fontWeight: 'normal',
    marginVertical: 3,
    marginLeft: 2
  },
  bullet: {
    width: 10,
    marginLeft: 5,
    fontWeight: 'normal'
  },
  li: {
    flexDirection: 'row',
    marginBottom: 2
  },
  li_content: {
    marginLeft: 2,
    marginBottom: 1,
    flex: 1,
    fontWeight: 'normal'
  },
  number: {
    width: 15,
    fontWeight: 'normal'
  },
  code: {
    fontFamily: 'MonoplexKR',
    fontSize: 11,
    lineHeight: 1.6,
    fontWeight: 'normal',
    backgroundColor: '#f5f5f5',
    padding: '25',
    borderRadius: 3,
    marginVertical: 5
  },
  blockquote: {
    backgroundColor: '#f0f0f0',
    color: '#333333',
    borderLeftWidth: 3,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    fontWeight: 'normal'
  },
  strong: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  em: {
    fontFamily: 'MonoplexKR',
    fontStyle: 'italic',
    fontWeight: 'normal'
  },
  underline: {
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    fontWeight: 'normal'
  },
  del: {
    textDecoration: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: 'normal'
  },
  quiz_question: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 5
  },
  quiz_index: {
    fontWeight: 'medium',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#F7F7F7'
  },
  quiz_option: {
    marginHorizontal: 15,
    textAlign: 'justify',
    fontWeight: 'medium'
  },
  answer_index: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 12,
    height: 12
  },
  answer: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  answer_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 3,
    gap: 8
  }
});

export default function MaterialPDFDocument({ materials }: Props) {
  const renderMarkdown = (markdown: string) => {
    const tokens = marked.lexer(markdown);

    const renderTokens = (tokens: Token[] | undefined, level = 0) => {
      const marginLeft = level;

      return tokens
        ?.filter((token) => !(token.type === 'paragraph' && !token.text.trim()))
        .map((token, index) => {
          switch (token.type) {
            case 'heading':
              const headingStyle = `h${token.depth}` as keyof typeof styles;
              return (
                <Text key={index} style={styles[headingStyle]}>
                  {token.text}
                </Text>
              );
            case 'list':
              const listItems = token.items.map(
                (item: any, itemIndex: number) => (
                  <View
                    key={itemIndex}
                    style={[
                      styles.li,
                      {
                        marginLeft
                      }
                    ]}
                  >
                    {!token.ordered && <Text style={styles.bullet}>•</Text>}
                    {token.ordered && (
                      <Text style={styles.number}>{`${itemIndex + 1}.`}</Text>
                    )}
                    <View style={styles.li_content}>
                      {renderTokens(item.tokens, level + 1)}
                    </View>
                  </View>
                )
              );

              return (
                <View key={index} style={styles.ul}>
                  {listItems}
                </View>
              );
            case 'code':
              const lines = token.text.split('\n');
              return (
                <Text key={index} style={styles.code}>
                  {lines.map((line: string, lineIndex: number) => (
                    <Text key={lineIndex}>
                      {line}
                      {lineIndex < lines.length - 1 ? '\n ' : ''}
                    </Text>
                  ))}
                </Text>
              );
            case 'blockquote':
              return (
                <View key={index} style={styles.blockquote}>
                  {renderTokens(token.tokens)}
                </View>
              );
            case 'paragraph':
            case 'strong':
            case 'em':
            case 'del':
            case 'underline':
              const style = styles[token.type];
              return (
                <Text key={index} style={style}>
                  {token.tokens ? renderTokens(token.tokens) : token.text}
                </Text>
              );
            default:
              return (
                <Text key={index} style={styles.paragraph}>
                  {token.raw}
                </Text>
              );
          }
        });
    };

    return renderTokens(tokens);
  };

  return (
    <Document>
      <Page style={styles.body}>
        <Image src={'/logo/logo.png'} style={styles.logo} />
        <Text style={styles.title}>{materials.course_title}</Text>
        {materials.materials.map((material) => {
          return (
            <View key={material.index}>
              <View style={styles.subtitle}>
                <View style={styles.video_index_container}>
                  <Text style={styles.video_index}>{material.index}</Text>
                </View>
                <Text style={styles.video_title}>{material.video_title}</Text>
              </View>
              {material.usable ? (
                <View>
                  <Text style={styles.channel}>{material.channel}</Text>
                  <Text style={styles.section_heading}>{'📝  강의 노트'}</Text>
                  {renderMarkdown(
                    material.summary_brief.content.replace(TimestampRegex, '')
                  )}
                  <Text style={styles.section_heading}>{'🤔  퀴즈'}</Text>
                  {material.quizzes.map((quiz) => {
                    return (
                      <View key={quiz.index}>
                        <Text
                          style={styles.quiz_question}
                        >{`Q.${quiz.index} ${quiz.question}`}</Text>
                        {quiz.options.map((option, index) => {
                          return (
                            <View
                              style={[styles.li, styles.quiz_option]}
                              key={index}
                            >
                              <Text style={styles.number}>{`${
                                index + 1
                              }.`}</Text>
                              <Text style={styles.paragraph}>{option}</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                  <View style={{ marginBottom: 20 }} />
                </View>
              ) : (
                <View style={styles.unavailable}>
                  <Text style={[styles.h3, { paddingBottom: 10 }]}>
                    {'🚫 정책상 강의 자료를 생성할 수 없어요!'}
                  </Text>
                  <Text style={styles.h5}>
                    {'다른 강의에서 스룸의 AI 자동 생성 자료를 확인해 보세요'}
                  </Text>
                </View>
              )}
            </View>
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
      <Page style={styles.body}>
        <Image src={'/logo/logo.png'} style={styles.logo} />
        <Text style={{ ...styles.section_heading, marginTop: 0 }}>
          {'✅  해답'}
        </Text>
        {materials.answers.map((video, index) => {
          return (
            <View key={index}>
              <View style={styles.subtitle}>
                <View style={styles.video_index_container}>
                  <Text style={styles.video_index}>{index + 1}</Text>
                </View>
                <Text style={styles.video_title}>{video.video_title}</Text>
              </View>
              {video.video_answers.map((answer) => {
                return (
                  <View style={styles.answer_container} key={answer.quiz_index}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        minWidth: 30
                      }}
                    >
                      <Text
                        style={styles.paragraph}
                      >{`${video.video_index}-${answer.quiz_index}.`}</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 3
                      }}
                    >
                      <View style={styles.answer_index}>
                        <Text style={styles.answer}>{answer.answer}</Text>
                      </View>
                      <Text style={styles.paragraph}>{answer.answer_str}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
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
