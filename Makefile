# build shmupwarz

#
# Application NAME
#
NAME=shmupwarz

# vala compiler
VC=valac

# --vapidir=./sdl2-vapi
# mingw for windows executables
CC=--cc=x86_64-w64-mingw32-gcc
# vala flags
# -g debug
# -w
FLAGS=--disable-warnings
DEBUG=-g --save-temps

#
# vala core libs
# reference the vala libs at /usr/share/vala/vapi
#
LIBS=--pkg glib-2.0 \
			--pkg gobject-2.0 \
			--pkg gee-0.8 \
			--pkg sdl2 \
			--pkg sdl2-gfx \
			--pkg sdl2-image \
			--pkg sdl2-ttf \
			--pkg sdl2-mixer \
			--pkg gio-2.0 

TST=test/src/Vunny.gs \
		test/src/Should.gs \
		test/src/Test.gs \
		test/src/To.gs \
		test/TestFX.gs

APP=gen/GeneratedComponents.gs \
		src/game/Entities.gs \
		src/game/systems/DestroySystem.gs \
		src/game/systems/ColorTweenSystem.gs \
		src/game/systems/ExpiringSystem.gs \
		src/game/systems/MovementSystem.gs \
		src/game/systems/RenderPositionSystem.gs \
		src/game/systems/ViewManagerSystem.gs \
		src/game/systems/PlayerInputSystem.gs \
		src/game/systems/EntitySpawningTimerSystem.gs \
		src/game/systems/CollisionSystem.gs \
		src/game/systems/RemoveOffscreenShipsSystem.gs \
		src/game/systems/ScaleTweenSystem.gs \
		src/game/systems/HudRenderSystem.gs \
		src/game/Game.gs


#
# source code for this project
#
SOURCES=src/DarkMatter.vala \
			src/Utils/UUID.vala \
			src/Bosco/Bag.gs \
			src/Bosco/ECS/Exceptions.gs \
			src/Bosco/Events/EntityReleased.gs \
			src/Bosco/Events/ComponentReplaced.gs \
			src/Bosco/Events/EntityChanged.gs \
			src/Bosco/Events/WorldChanged.gs \
			src/Bosco/Events/GroupsChanged.gs \
			src/Bosco/Events/GroupChanged.gs \
			src/Bosco/Events/GroupUpdated.gs \
			src/Bosco/Interfaces/IComponent.vala \
			src/Bosco/Interfaces/ISystem.vala \
			src/Bosco/Interfaces/IMatcher.vala \
			src/Bosco/ECS/EntityBase.gs \
			src/game/generated/Entity.gs \
			src/Bosco/ECS/Group.gs \
			src/game/generated/Matching.gs \
			src/Bosco/ECS/Matcher.gs \
			src/Bosco/ECS/WorldBase.gs \
			src/game/generated/World.gs \
			src/Bosco/Timer.gs \
			src/Bosco/Sprite.gs \
			src/Bosco/AbstractGame.gs

BASELIB=src/DarkMatter.vala \
			src/Utils/UUID.vala \
			src/Bosco/Bag.gs \
			src/Bosco/ECS/Exceptions.gs \
			src/Bosco/Events/EntityReleased.gs \
			src/Bosco/Events/ComponentReplaced.gs \
			src/Bosco/Events/EntityChanged.gs \
			src/Bosco/Events/WorldChanged.gs \
			src/Bosco/Events/GroupsChanged.gs \
			src/Bosco/Events/GroupChanged.gs \
			src/Bosco/Events/GroupUpdated.gs \
			src/Bosco/Interfaces/IComponent.vala \
			src/Bosco/Interfaces/ISystem.vala \
			src/Bosco/Interfaces/IMatcher.vala \
			src/Bosco/ECS/EntityBase.gs \
			src/Bosco/ECS/CoreTest.vala \
			src/Bosco/ECS/Group.gs \
			src/Bosco/ECS/Matcher.gs \
			src/Bosco/ECS/WorldBase.gs \
			src/Bosco/Timer.gs \
			src/Bosco/Sprite.gs \
			src/Bosco/AbstractGame.gs


#
# c libs needed for the gcc compiler
#
CLIBS=-X -lm -X -lSDL2_image -X -lSDL2_ttf -X -lSDL2_mixer -X -lSDL2_gfx

#
# c flags needed for the gcc compiler
#
CFLAGS=-X -w 

#-X -I/usr/include/SDL2

#
# Folder for finished binaries
#
BIN=build
.PHONY: build

SRC=src


#
# Resouce location
#
RESOURCES=res

#
# Entitas generated files
#
gen/%.gs: entitas.json
	npm run entitas


default: $(BIN)/$(NAME)
$(BIN)/$(NAME): $(SOURCES) $(APP)
	-mkdir -p $(BIN)
	cp -R --force $(RESOURCES) $(BIN)
	$(VC) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(APP) -o $(BIN)/$(NAME)



test: test/$(BIN)/$(NAME)
test/$(BIN)/$(NAME): $(BASELIB) $(TST)
	-mkdir -p test/$(BIN)
	cp -R --force $(RESOURCES) test/$(BIN)
	$(VC) $(FLAGS) $(LIBS) $(CLIBS) $(CFLAGS) $(BASELIB) $(TST) -o test/$(BIN)/$(NAME)
	test/$(BIN)/$(NAME)
	rm --force test/$(BIN)/$(NAME)

run: $(BIN)/$(NAME)
	$(BIN)/$(NAME)

clean:
	rm -rf $(BIN)/*.o
	rm -rf $(SRC)/*.c
	rm -rf $(SRC)/game/*.c
	rm -rf $(SRC)/game/systems/*.c
	rm -rf $(SRC)/Bosco/Events/*.c
	rm -rf $(SRC)/Bosco/ECS/*.c
	rm -rf $(SRC)/Bosco/Interfaces/*.c

debug: debug/$(BIN)/$(NAME)
debug/$(BIN)/$(NAME): $(SOURCES) $(TST)
	-mkdir -p $(BIN)
	cp -R --force $(RESOURCES) $(BIN)
	$(VC) $(DEBUG) $(LIBS) $(CLIBS) $(CFLAGS) $(SOURCES) $(APP) -o $(BIN)/$(NAME)

