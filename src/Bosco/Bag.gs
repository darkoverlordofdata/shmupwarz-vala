[indent=4]
namespace Bosco.ECS
    class Bag of T : DarkMatter

        _queue : array of IComponent
        _alloc : int
        _used : int


        construct(alloc : int = 64)
            _used = 0
            _alloc = alloc
            _queue = new array of IComponent[alloc]


        prop length : int
            get
                return _used

        def clear()
            _used = 0

        def push_head(component : IComponent)
            if _used >= _queue.length
                _queue += (IComponent)component
            else
                _queue[_used++] = (IComponent)component

        def pop_head() : T
            return (T)_queue[--_used]
