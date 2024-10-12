---
title: '50 个 React 技巧'
date: 2024-09-29
tags: ['react']
type: 'DefaultPost'
---

## 50 个 React 技巧

1. 组件重用

    通过 props 传递参数

    ```jsx
    const CustomButton = ({label, onClick}) => {
        return <button onClick={onClick}>{label}</button>
    }
    ```

2. 默认 props 值

    ```jsx
    const CustomButton = ({label, onClick}) => {
        return <button onClick={onClick}>{label}</button>
    }
    CustomButton.defaultProps = {
        label: 'default'
    }
    ```

3. Props 类型

    ```jsx
    const CustomButton = ({label, onClick}) => {
        return <button onClick={onClick}>{label}</button>
    }
    CustomButton.propTypes = {
        label: PropTypes.string
        onClick: PropTypes.func.isRequired
    }
    ```

4. hooks 功能组件

    ```jsx
    const Counter = () => {
        const [count, setCount] = useState(0);
        return <button onClick={() => setCount(count + 1)}>{count}</button>
    }
    ```

5. 自定义 hook

    ```jsx
    const useFetch = (url) => {
        const [data, setData] = useState(null);
        useEffect(() => {
            fetch(url)
            .then(response => response.json())
            .then(setData)
        }, [url]);
        return data;
    }
    ```

6. Context API

    ```jsx
    const ThemeContext = React.createContext('light');
    const ThemeProvider = ({children}) => {
        return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
    }
    const ThemeComponent = () => {
        const theme = useContext(ThemeContext);
        return <div className={`theme-${theme}`}>{theme}</div>
    }

    // Usage
    <ThemeProvider>
        <ThemeComponent />
    </ThemeProvider>
    ```

7. 错误边界

    ```jsx
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        static getDerivedStateFromError(error) {
            return { hasError: true };
        }
        componentDidCatch(error, errorInfo) {
            console.log(error, errorInfo);
        }

        render() {
            if(this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }
            return this.props.children;
        }
    }

    // Usage
    <ErrorBoundary>
        <div>...</div>
    </ErrorBoundary>
    ```

8. 记忆组件

    ```jsx
    const CustomComponent = React.memo(({value})=> {
        return <div>{value}</div>
    })

    // Usage
    <CustomComponent value="hello" />
    ```

9. useCallback 和 useMemo

    ```jsx
    const computeExpensiveValue = (a, b) => {
        return a + b
    }

    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    const memoizedCallback = useCallback(() => console.log(memoizedValue), [memoizedValue]);
    ```

10. 懒加载

    ```jsx
    const LazyComponent = React.lazy(() => import('./LazyComponent'));
    ```

11. Fragment

    ```jsx
    const List = () => (
        <>
            <li>1</li>
            <li>2</li>
        </>
    )
    ```

12. key 属性

    ```jsx
    const List = () => {
        return (
            <ul>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        )
    }
    ```

13. 可控组件

    ```jsx
    const Input = ({value, onChange}) => {
        return <input value={value} onChange={onChange} />
    }
    ```

14. 不可控组件

    ```jsx
    const inputRef = React.createRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputRef.current.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    )
    ```

15. 合成组件

    ```jsx
    const CustomButton = () => {
        const handleClick = (e) => {
            e.preventDefault();
            console.log('clicked');
        }

        return <button onClick={handleClick}>Click me</button>
    }

16. 批量更新

    ```jsx
    const Counter = () => {
        const [count, setCount] = useState(0);
        const handleClick = () => {
            setCount((prevCount) => prevCount + 1);
        }

        return <button onClick={handleClick}>{count}</button>
    }
    ```

17. Refs

    ```jsx
    const FocusInput = () => {
        const inputRef = useRef();
        const handleClick = () => {
            inputRef.current.focus();
        }

        return (
            <div>
                <input ref={inputRef} />
                <button onClick={handleClick}>Focus</button>
            </div>
        )
    }
    ```

18. Portals

    将子组件渲染到父组件之外的 DOM 节点中, 例如一个弹窗.

    ```jsx
    const Modal = ({children}) => {
        return ReactDOM.createPortal(
            <div>{children}</div>,
            document.getElementById('modal-root')
        )
    }
    ```

19. 高阶组件

    ```jsx
    const withLogging = (WrappedComponent) => {
        return class extends React.Component {
            componentDidMount() {
                console.log('Component mounted');
            }
            render() {
                return <WrappedComponent {...this.props} />
            }
        }
    }

    // Usage
    const MyComponent = () => <div>...</div>
    const WrappedComponent = withLogging(MyComponent);
    <MyComponentWithLogging />
    ```

20. 可控组件和不可控组件

    ```jsx
    const ControlledInput = () => {
        const [value, setValue] = useState('');
        return <input value={value} onChange={(e) => setValue(e.target.value)} />
    }

    const UncontrolledInput = () => {
        const inputRef = useRef();
        return <input ref={inputRef} />
    }
    ```

21. 组合组件

    ```jsx
    <div>
        <Header />
        <Main />
        <Footer />
    </div>
    ```

22. 动态引入

    ```jsx
    const Component = React.lazy(() => import('./LazyComponent'));
    ```

23. useReducer 和 Context

    使用 `useReducer` 和 `Context` 来高效地管理复杂状态逻辑.

    ```jsx
    const initialState = {
        count: 0
    }
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 };
            case 'decrement':
                return { count: state.count - 1 };
            default:
                throw new Error();
        }
    }
    const CountContext = React.createContext();
    const CountProvider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        return (
            <CountContext.Provider value={{ state, dispatch }}>
                {children}
            </CountContext.Provider>
        );
    }
    const Counter = () => {
        const { state, dispatch } = useContext(CountContext);
        return (
            <div>
                Count: {state.count}
                <button onClick={() => dispatch({ type: 'increment' })}>
                    Increment
                </button>
                <button onClick={() => dispatch({ type: 'decrement' })}>
                    Decrement
                </button>
            </div>
        );
    }

    // Usage
    <CountProvider>
        <Counter />
    </CountProvider>
    ```

24. 转发 Refs

    ```jsx
    const CustomButton = React.forwardRef((props, ref) => {
        return <button ref={ref}>{props.children}</button>
    })

    // Usage
    const ref = React.createRef();
    <CustomButton ref={ref} />
    ```

25. 使用 refs 管理 focus

    ```jsx
    const FocusInput = () => {
        const inputRef = useRef();

        useEffect(() => {
            inputRef.current.focus();
        }, []);

        return <input ref={inputRef} />
    }

    // Usage
    <FocusInput />
    ```

26. 使用 useEffect 处理异步请求

    ```jsx
    const DataFetcher = () => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setLoading(false);
                fetchData();
            }
        }, [url]);

        return loading ? 'Loading...' : data;
    }

    // Usage
    <DataFetcher />
    ```

27. 防抖

    ```jsx
    import { useState, useEffect } from 'react';

    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
        return debouncedValue;
    }

    // Usage
    const SearchInput = () => {
        const [query, setQuery] = useState('');
        const debouncedQuery = useDebounce(query, 500);
        useEffect(() => {
            console.log('Searching for '+debouncedQuery);
        },[debouncedQuery]);
        return (
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        );
    }
    ```

28. 节流

    ```jsx
    import { useCallback, useEffect, useRef } from 'react';

    const useThrottle = (callback, delay) => {
        const lastCall = useRef(0);
        return useCallback((...args) => {
            const now = Date.now();
            if (now - lastCall.current >= delay) {
                lastCall.current = now;
                callback(...args);
            }
        }, [callback, delay]);
    };

    // Usage
    const ScrollComponent = () => {
        const handleScroll = useThrottle(() => {
            console.log('Scrolling...');
        }, 1000);

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [handleScroll]);

        return <div>Scroll to see throttling in action</div>
    }
    ```

29. 生命周期

    ```jsx
    const LifecycleComponent = () => {
        useEffect(() => {
            console.log('componentDidMount');
            return () => {
                console.log('componentWillUnmount');
            };
        }, []);

        useEffect(() => {
            console.log('componentDidUpdate');
        });

        return <div>LifeCycle Demo</div>;
    }

    // Usage
    <LifecycleComponent />
    ```

30. 持久化状态

    使用本地存储来保持状态

31. 自定义 Hook 获取数据

    ```jsx
    import { useState, useEffect } from 'react';

    const useFetch = (url) => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setLoading(false);
            }
            fetchData();
        }, [url]);

        return { data, loading };
    }

    // Usage
    const { data, loading } = useFetch(url);
    ```

32. 使用 React.memo 提高性能

    ```jsx
    const MyComponent = React.memo(({value}) => {
        console.log('Render MyComponent');
        return <div>{value}</div>
    })

    // Usage
    <MyComponent value="Hello" />
    ```

33. CSS-in-JS 样式组件

    ```jsx
    import styled from 'styled-components';
    const Button = styled.button`
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    `

    // Usage
    <Button>Submit</Button>
    ```

34. Prop-Types 类型检查

    ```jsx
    import PropTypes from 'prop-types';

    const MyComponent = ({ name, age}) => {
        return <div>{name} {age}</div>
    }

    MyComponent.propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number
    }

    // Usage
    <MyComponent name="John" age={30} />
    ```

35. TypeScript 类型安全

    ```tsx
    type Props = {
        name: string;
        age: number;
    }

    const MyComponent: React.FC<Props> = ({ name, age}) => {
        return <div>{name} {age}</div>
    }

    // Usage
    <MyComponent name="John" age={30} />
    ```

36. 使用 useEffect 处理副作用

    ```jsx
    const DataFetcher = ({ url }) => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setLoading(false);
            };
            fetchData();
        }, [url]);

        return loading ? <div>Loading...<div> : <div>data.title</div>;
    };

    // Usage
    <DataFetcher url="https://jsonplaceholder.typicode.com/todos/1" />
    ```

37. 使用自定义 Hooks 处理 Context

    ```jsx
    const ThemeContext = React.createContext('light');

    const useTheme = () => {
        const context = useContext(ThemeContext);
        if (!context) {
            throw new Error('useTheme must be used within a ThemeProvider');
        }
        return context;
    };

    const ThemeComponent = () => {
        const theme = useTheme();
        return <div className={`theme-${theme}`}>Themed Component</div>
    };

    // Usage
    const App = () => (
        <ThemeContext.Provider value="dark">
            <ThemeComponent />
        </ThemeContext.Provider>
    )
    ```

38. 使用 React.memo 减少 re-render

    ```jsx
    const MyComponent = React.memo(({ value }) => {
        console.log('Render MyComponent');
        return <div>{value}</div>
    })

    // Usage
    const App = () => {
        const [count, setCount] = useState(0);

        return (
            <div>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <MyComponent value='Hello' />
            </div>
        );
    };
    ```

39. 异步函数错误处理

    ```jsx
    const DataFetcher = ({ url }) => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setData(result);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                };
            };
            fetchData();
        }, [url]);

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return <div>{data.title}</div>;
    };

    // Usage
    <DataFetcher url="https://jsonplaceholder.typicode.com/todos/1" />
    ```

40. Next.js 服务端渲染

    ```jsx
    const Home = ({ data }) => {
        return (
            <div>
                <h1>Server-side Rendered Data</h1>
                <p>{data.title}</p>
            </div>
        );
    };

    export async function getServerSideProps() {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await res.json();
        return { props: { data } };
    }

    // Usage
    export default Home;
    ```

41. Next.js 静态页面

    ```jsx
    const Home = ({ data }) => {
        return (
            <div>
                <h1>Static Page</h1>
                <p>{data.title}</p>
            </div>
        )
    }

    export async function getStaticProps() {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await res.json();
        return { props: { data } };
    }

    // Usage
    export default Home;
    ```

42. 客户端路由

    ```jsx
    import { BrowserRouter as Router, Route, Route, Switch, Link } from 'react-router-dom';

    const Home = () => <h1>Home</h1>;
    const About = () => <h1>About</h1>;

    const App = () => (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Router>
    )

    // Usage
    <App />
    ```

43. 使用 React 测试库进行测试

44. 使用 React DevTools 进行调试

45. 使用 useMemo 记忆昂贵的计算

    ```jsx
    const ExpensiveComponent = ({ value }) => {
        const expensiveCalculation = (num) => {
            console.log('Calculating...');
            return num * 2;
        };

        const memoizedCalculation = useMemo(() => expensiveCalculation(value), [value]);
        return <div>{memoizedCalculation}</div>;
    };

    // Usage
    <ExpensiveComponent value={10} />
    ```

46. 使用 useCallback 缓存函数

    ```jsx
    const Button = React.memo(({ onClick, children }) => {
        return <button onClick={onClick}>{children}</button>
    })

    const App = () => {
        const [count, setCount] = useState(0);
        const handleClick = useCallback(() => {
            setCount((prevCount) => prevCount + 1);
        }, [count]);

        return (
            <div>
                <Button onClick={handleClick}>Click me</Button>
                <p>{count}</p>
            </div>
        )
    }

    // Usage
    <App />
    ```

47. 环境变量

48. 使用 react-i18next 进行国际化

49. 使用 React.lazy 拆分代码

    ```jsx
    import React, { lazy, Suspense } from 'react';

    const LazyComponent = lazy(() => import('./LazyComponent'));

    const App = () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );

    // Usage
    <App />
    ```

50. 使用 webpack 删除无用的代码
