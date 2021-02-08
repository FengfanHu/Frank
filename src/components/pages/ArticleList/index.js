import List from '../../List';

function ArticleList(props) {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      description:
        '创建时间 2021.01.23',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
      poster:
        'https://picsum.photos/150'
    });
  }

  return (
    <List data={listData} />
    );
}

export default ArticleList;
