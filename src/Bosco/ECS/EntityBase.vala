namespace Bosco.ECS {

    public errordomain Exception {
        ECS
    }

    public abstract class EntityBase : DarkMatter {

        /**
         * @static
         * @type number */
        static int instanceIndex = 0;

        /**
         * @static
         * @type number */
        static int size = 0;

        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Entity#creationIndex */
        public int creationIndex { get {return _creationIndex; } }

        /**
         * Entity name
         * @type string */
        public string name { get {return _name;} }

        /**
         *    Entity Id
         * @type string */
        public string id { get {return _id;} }

        public bool isEnabled { get {return _isEnabled;} }

        public int refCount { get{return _refCount;} }

        /**
         * Subscribe to Entity Released Event
         * @type entitas.ISignal */
        public EntityReleased onEntityReleased { get {return _onEntityReleased;} }

        /**
         * Subscribe to Component Added Event
         * @type entitas.ISignal */
        public EntityChanged onComponentAdded { get {return _onComponentAdded;} }

        /**
         * Subscribe to Component Removed Event
         * @type entitas.ISignal */
        public EntityChanged onComponentRemoved { get {return _onComponentRemoved;} }

        /**
         * Subscribe to Component Replaced Event
         * @type entitas.ISignal */
        public ComponentReplaced onComponentReplaced { get {return _onComponentReplaced;} }

        public static bool first = true;
        public static int maxEntities = 128;
        public static int incEntities = 64;
        public static int db_index = 0;
        public static IComponent[] _components;
        public int db_id = 0;
        public int ic = 0;

        World _world;
        string _toStringCache;
        IComponent[] _componentsCache;
        int[] _componentIndicesCache;
        unowned string[] _componentsEnum;
        int _totalComponents;
        int _componentCount;
        int _creationIndex;
        string _name;
        string _id;
        bool _isEnabled;
        int _refCount;
        EntityReleased _onEntityReleased;
        EntityChanged _onComponentAdded;
        EntityChanged _onComponentRemoved;
        ComponentReplaced _onComponentReplaced;

        /**
         * The basic game object. Everything is an entity with components that
         * are added / removed as needed.
         *
         * @param Object componentsEnum
         * @param number totalComponents
         * @constructor
         */
        public EntityBase(string[] componentsEnum, int totalComponents = 32) {

            _totalComponents = totalComponents;
            _componentCount = componentsEnum.length;

            if (first) {
                _components = new IComponent[_componentCount * maxEntities];
                first = false;
            }
            if (db_index >= maxEntities) {
                maxEntities += incEntities;
                _components.resize(_componentCount * maxEntities);
            }
            db_id = db_index++;
            ic = db_id * _componentCount;

            _onEntityReleased = new EntityReleased();
            _onComponentAdded = new EntityChanged();
            _onComponentRemoved = new EntityChanged();
            _onComponentReplaced = new ComponentReplaced();
            _componentIndicesCache = new int[totalComponents];
            _componentsEnum = componentsEnum;
            _world = World.instance;
        }

        /**
         * Initialize the entity after allocation from the pool
         *
         * @param string  name
         * @param string  id
         * @param int creationIndex
         */
        public void initialize(string name, string id, int creationIndex) {
            _name = name;
            _creationIndex = creationIndex;
            _isEnabled = true;
            _id = id;
            addRef();
        }
         /**
          * AddComponent
          *
          * @param number index
          * @param entitas.IComponent component
          * @returns entitas.Entity
          */
        public Entity addComponent(int index, IComponent component) throws Exception {
            if (!_isEnabled) {
                throw new Exception.ECS("EntityIsNotEnabledException - Cannot add component!");
            }

            if (hasComponent(index)) {
                throw new Exception.ECS("EntityAlreadyHasComponentException - Cannot add %s at index %d", _componentsEnum[index], index);
            }

            _components[ic+index] = component;
            _componentsCache = null;
            _componentIndicesCache = null;
            _toStringCache = null;
            _onComponentAdded.dispatch((Entity)this, index, component);
            return (Entity)this;
        }
        /**
         * RemoveComponent
         *
         * @param number index
         * @returns entitas.Entity
         */
        public Entity removeComponent(int index) throws Exception {
            if (!_isEnabled) {
                throw new Exception.ECS("EntityIsNotEnabledException - Cannot remove component!");
            }

            if (!hasComponent(index)) {
                throw new Exception.ECS("EntityDoesNotHaveComponentException - Cannot remove %s at index %d", _componentsEnum[index], index);
            }

            _replaceComponent(index, null);
            return (Entity)this;
        }

        /**
         * ReplaceComponent
         *
         * @param number index
         * @param entitas.IComponent component
         * @returns entitas.Entity
         */
        public Entity replaceComponent(int index, IComponent component) throws Exception {
            if (!_isEnabled) {
                throw new Exception.ECS("Exception.EntityIsNotEnabledException -Cannot replace component!");
            }

            if (hasComponent(index)) {
                _replaceComponent(index, component);
            }
            else if (component != null) {
                addComponent(index, component);
            }
            return (Entity)this;
        }

        public void _replaceComponent(int index, IComponent? replacement) {
            var previousComponent = _components[ic+index];
            if (previousComponent == replacement) {
                _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement);
            }
             else {
                _components[ic+index] = replacement;
                _componentsCache = null;
                if (replacement == null) {
                    _components[ic+index] = null;
                    _componentIndicesCache = null;
                    _toStringCache = null;
                    _onComponentRemoved.dispatch((Entity)this, index, previousComponent);
                }
                 else {
                    _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement);
                 }
             }
        }

        /**
         * GetComponent
         *
         * @param number index
         * @param entitas.IComponent component
         */
        public unowned IComponent  getComponent(int index) throws Exception {
            if (!hasComponent(index)) {
                throw new Exception.ECS("EntityDoesNotHaveComponentException - Cannot get %s at index %d", _componentsEnum[index], index);
            }
            return _components[ic+index];
        }

        /**
         * GetComponents
         *
         * @returns Array<entitas.IComponent>
         */
        public IComponent[] getComponents() { 
            if (_componentsCache == null) {
                var components = new IComponent[0];
                //for var component in _components
                for (var i = 0;  i < (ic+_componentCount-1); i++) {
                    if (_components[i] != null) {
                        components+= _components[i];
                    }
                }
                _componentsCache = components;
            }
            return _componentsCache;
        }

        /**
         * GetComponentIndices
         *
         * @returns Array<number>
         */
        public int[] getComponentIndices() {
            if (_componentIndicesCache == null) {
                var indices = new int[0];
                var index = 0;
                for (var i = ic; ic < (ic+_componentCount-1); ic++) {
                    if (_components[i] != null) {
                        indices+= index;
                    }
                    index++;
                }
                _componentIndicesCache = indices;
            }
            return _componentIndicesCache;
        }
         /**
          * HasComponent
          *
          * @param number index
          * @returns boolean
          */
        public bool hasComponent(int index) {
            return _components[ic+index] != null;
        }

        /**
         * HasComponents
         *
         * @param Array<number> indices
         * @returns boolean
         */
        public bool hasComponents(int[] indices) { 
            foreach (var index in indices) {
                if (_components[ic+index] == null)
                    return false;
            }
            return true;
        }

        /**
         * HasAnyComponent
         *
         * @param Array<number> indices
         * @returns boolean
         */
        public bool hasAnyComponent(int[] indices) {
            foreach (var index in indices) {
                if (_components[ic+index] != null)
                    return true;
            }
            return false;
        }

        /**
         * RemoveAllComponents
         *
         */
        public void removeAllComponents() {
            _toStringCache = "";
            var index = 0;
            for (var i = ic; i < (ic+_componentCount-1); i++) {
                if (_components[i] != null)
                    _replaceComponent(index, null);
                index++;
            }
        }

        /**
         * Destroy
         *
         */
        public void destroy() {
            removeAllComponents();
            _onComponentAdded.clear();
            _onComponentReplaced.clear();
            _onComponentRemoved.clear();
            _isEnabled = false;
        }

        /**
         * ToString
         *
         * @returns string
         */
        public string toString() {
            if (_toStringCache == null) {
                var sb = new StringBuilder();
                var seperator = ", ";

                var components = getComponentIndices();
                var lastSeperator = components.length - 1;
                for (var i = 0; i < (lastSeperator); i++) {
                    sb.append(_componentsEnum[components[i]].replace("Component", ""));
                    if (i < lastSeperator)
                        sb.append(seperator);
                }
                _toStringCache = sb.str;
            }
            return _toStringCache;
        }
        /**
         * AddRef
         *
         * @returns entitas.Entity
         */
        public Entity addRef() {
            _refCount += 1;
            return (Entity)this;
        }


        /**
         * Release
         *
         */
        public void release() throws Exception {
            _refCount -= 1;
            if (_refCount == 0)
                _onEntityReleased.dispatch((Entity)this);
            else if (_refCount < 0)
                throw new Exception.ECS("EntityIsAlreadyReleasedException");
        }
    }
}
