import { List } from 'antd';

function ArticleList(props) {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      description:
        '创建时间 2021.01.23',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
      poster:
        'https://picsum.photos/150'
    });
  }

  return (
    <div className={'list'} >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        footer={
          <div>Frank</div>
        }
        renderItem={item => (
          <List.Item
            className={'list-item'}
            key={item.title}
            extra={
              <img
                width={150}
                alt="poster"
                src={item.poster}
              />
            }
          >
            <List.Item.Meta
              title={<a className={'listWrapper-item-title'} href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
