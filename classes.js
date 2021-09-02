class Meteor {

    
    constructor(a, r){

        this.x = cos(a + 0.7) * r + width / 2
        this.y = sin(a + 0.7) * r + height / 2
        this.size = rand() * 10 + 15

        this.xs = rand() * 4 - 2
        this.ys = rand() * 4 - 2
        
        this.a = a;

        this.rmv = false
    }   // this.remove

    show(){
        
        this.move()

        push()
            noSmooth()
            image(images[0], this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        pop()
    }

    move(){
        this.x += this.xs
        this.y += this.ys

        if(this.x < 0 || this.y < 0 || this.x > width || this.y > height)
            this.rmv = true

    }

    collision(v){

        if(dist(v[0], v[1], this.x, this.y) < this.size * 8){
            if(dist(v[0], v[1], this.x, this.y) < this.size / 2){
                return true
            }

            if(dist(v[2], v[3], this.x, this.y) < this.size / 2){
                return true
            }

            if(dist(v[4], v[5], this.x, this.y) < this.size / 2){
                return true
            }

            if(dist(v[6], v[7], this.x, this.y) < this.size / 2){
                return true
            }
        }
        return false
    }

}


class Particle {

    constructor(x, y){
        this.x = x;
        this.y = y;

        this.xs = rand() * 2 - 1
        this.ys = rand() * 2 - 1

        this.l = 255;

        this.col = {
            r: rand() * 100 + 155,
            g: 0,
            b: rand() * 50 + 50,
        }

    }

    show(){
        noStroke()

        fill(this.col.r, this.col.g, this.col.b, this.l)
        rect(this.x, this.y, 10)

        this.move()
    }

    move() {
        this.l -= 3
        
        this.x += this.xs
        this.y += this.ys
    }

}


class Player {

    show(x, y){
        stroke(255); noFill()
        rect(x - 10, y - 10, 20, 20)
    }

    control(r){
        if(keyIsDown(65)){
            r += 4
        } else if(keyIsDown(68)){
            r -= 4
        }
        return r
    }

    getVertexes(x, y, size){
        return [
            x, y, 
            x + size, y, 
            x, y + size, 
            x + size, y + size
        ]
    }



}