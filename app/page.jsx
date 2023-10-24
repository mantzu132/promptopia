import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className='flex-center flex-col'>
            <h1 className='head_text text-center'>
                Discover & Share
                <br/>
                <span className='orange_gradient '>AI-POWERED PROMPTS</span>
            </h1>
            <p className='desc text-center'>Promptopia is an open-source AI prompting tool for modern world to share and discover creative prompts</p>

            <Feed/>
        </section>
    );
};

export default Home;