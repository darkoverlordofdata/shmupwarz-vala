[indent=4]
namespace Bosco.ECS

    exception Exception
        ECS

    class abstract EntityBase : DarkMatter

        /**
         * @static
         * @type number */
        instanceIndex : static int = 0

        /**
         * @static
         * @type number */
        size : static int = 0

        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Entity#creationIndex */
        prop readonly creationIndex : int

        /**
         * Entity name
         * @type string */
        prop readonly name : string

        /**
         *    Entity Id
         * @type string */
        prop readonly id : string

        prop readonly isEnabled : bool

        prop readonly refCount : int


        /**
         * Subscribe to Entity Released Event
         * @type entitas.ISignal */
        prop readonly onEntityReleased : EntityReleased

        /**
         * Subscribe to Component Added Event
         * @type entitas.ISignal */
        prop readonly onComponentAdded : EntityChanged

        /**
         * Subscribe to Component Removed Event
         * @type entitas.ISignal */
        prop readonly onComponentRemoved : EntityChanged

        /**
         * Subscribe to Component Replaced Event
         * @type entitas.ISignal */
        prop readonly onComponentReplaced : ComponentReplaced

        db : static array of IComponent
        first : static bool = true
        db_index : static int = 0
        ic : int = 0
        index : int = 0

        _world : World
        _toStringCache : string
        _components : array of IComponent
        _componentsCache : array of IComponent
        _componentIndicesCache : array of int
        _componentsEnum : unowned array of string

        /**
         * The basic game object. Everything is an entity with components that
         * are added / removed as needed.
         *
         * @param Object componentsEnum
         * @param number totalComponents
         * @constructor
         */
        construct(componentsEnum : array of string, totalComponents : int = 32)

            if first
                db = new array of IComponent[componentsEnum.length * 512]
                first = false

            index = db_index++
            ic = index * componentsEnum.length


            _onEntityReleased = new EntityReleased()
            _onComponentAdded = new EntityChanged()
            _onComponentRemoved = new EntityChanged()
            _onComponentReplaced = new ComponentReplaced()
            _components = new array of IComponent[totalComponents]
            _componentIndicesCache = new array of int[totalComponents]
            _componentsEnum = componentsEnum
            _world = World.instance


        /**
         * Initialize the entity after allocation from the pool
         *
         * @param string  name
         * @param string  id
         * @param int creationIndex
         */
        def initialize(name : string, id : string, creationIndex : int)
            _name = name
            _creationIndex = creationIndex
            _isEnabled = true
            _id = id
            addRef()

         /**
          * AddComponent
          *
          * @param number index
          * @param entitas.IComponent component
          * @returns entitas.Entity
          */
        def addComponent(index : int, component : IComponent) : Entity raises Exception
            if !_isEnabled
                raise new Exception.ECS("EntityIsNotEnabledException - Cannot add component!")

            if hasComponent(index)
                raise new Exception.ECS("EntityAlreadyHasComponentException - Cannot add component at index %d", index)

            _components[index] = component
            _componentsCache = null
            _componentIndicesCache = null
            _toStringCache = null
            _onComponentAdded.dispatch((Entity)this, index, component)
            return (Entity)this

        /**
         * RemoveComponent
         *
         * @param number index
         * @returns entitas.Entity
         */
        def removeComponent(index : int) : Entity raises Exception
            if !_isEnabled
                raise new Exception.ECS("EntityIsNotEnabledException - Cannot remove component!")

            if !hasComponent(index)
                raise new Exception.ECS("EntityDoesNotHaveComponentException - Cannot remove component at index %d", index)

            _replaceComponent(index, null)
            return (Entity)this

        /**
         * ReplaceComponent
         *
         * @param number index
         * @param entitas.IComponent component
         * @returns entitas.Entity
         */
        def replaceComponent(index : int, component : IComponent) : Entity raises Exception
            if !_isEnabled
                raise new Exception.ECS("Exception.EntityIsNotEnabledException -Cannot replace component!")

            if hasComponent(index)
                _replaceComponent(index, component)
             else if component != null
                addComponent(index, component)

            return (Entity)this


        def _replaceComponent(index : int, replacement : IComponent?)
            var previousComponent = _components[index]
            if previousComponent == replacement
                _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement)
             else
                _components[index] = replacement
                _componentsCache = null
                if replacement == null
                    _components[index] = null
                    _componentIndicesCache = null
                    _toStringCache = null
                    _onComponentRemoved.dispatch((Entity)this, index, previousComponent)

                 else
                    _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement)

        /**
         * GetComponent
         *
         * @param number index
         * @param entitas.IComponent component
         */
        def getComponent(index : int) : unowned IComponent raises Exception
            if !hasComponent(index)
                raise new Exception.ECS("EntityDoesNotHaveComponentException - Cannot get component at index %d", index)

            return _components[index]

        /**
         * GetComponents
         *
         * @returns Array<entitas.IComponent>
         */
        def getComponents() : array of IComponent
            if _componentsCache == null
                var components = new array of IComponent[0]
                for var component in _components
                    if component != null
                        components+= component
                _componentsCache = components
            return _componentsCache

        /**
         * GetComponentIndices
         *
         * @returns Array<number>
         */
        def getComponentIndices() : array of int
            if _componentIndicesCache == null
                var indices = new array of int[0]
                for var i = 0 to (_components.length-1)
                    if _components[i] != null
                        indices+= i
                _componentIndicesCache = indices
            return _componentIndicesCache

         /**
          * HasComponent
          *
          * @param number index
          * @returns boolean
          */
        def hasComponent(index : int) : bool
            return _components[index] != null

        /**
         * HasComponents
         *
         * @param Array<number> indices
         * @returns boolean
         */
        def hasComponents(indices : array of int) : bool
            for var index in indices
                if _components[index] == null
                    return false
            return true

        /**
         * HasAnyComponent
         *
         * @param Array<number> indices
         * @returns boolean
         */
        def hasAnyComponent(indices : array of int) : bool
            for var index in indices
                if _components[index] != null
                    return true
            return false

        /**
         * RemoveAllComponents
         *
         */
        def removeAllComponents()
            _toStringCache = ""
            for var i = 0 to (_components.length-1)
                if _components[i] != null
                    _replaceComponent(i, null)

        /**
         * Destroy
         *
         */
        def destroy()
            removeAllComponents()
            _onComponentAdded.clear()
            _onComponentReplaced.clear()
            _onComponentRemoved.clear()
            _isEnabled = false


        /**
         * ToString
         *
         * @returns string
         */
        def toString() : string
            if _toStringCache == null
                var sb = new StringBuilder()
                var seperator = ", "

                var components = getComponentIndices()
                var lastSeperator = components.length - 1
                for var i = 0 to (lastSeperator)
                    sb.append(_componentsEnum[components[i]].replace("Component", ""))
                    if i < lastSeperator
                        sb.append(seperator)
                _toStringCache = sb.str
            return _toStringCache

        /**
         * AddRef
         *
         * @returns entitas.Entity
         */
        def addRef() : Entity
            _refCount += 1
            return (Entity)this


        /**
         * Release
         *
         */
        def release() raises Exception
            _refCount -= 1
            if _refCount == 0
                _onEntityReleased.dispatch((Entity)this)
            else if _refCount < 0
                raise new Exception.ECS("EntityIsAlreadyReleasedException")
